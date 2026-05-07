from typing import List, Optional
from datetime import datetime
# pyrefly: ignore [missing-import]
from bson import ObjectId
import math
import logging

from app.services.mongodb import db
from app.services.ai import ai_service

logger = logging.getLogger(__name__)

# ─── Chunking ─────────────────────────────────────────────────────────────────

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    """Split transcript into overlapping chunks for better retrieval."""
    words = text.split()
    chunks = []
    step = max(1, chunk_size - overlap)
    for i in range(0, len(words), step):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)
    return chunks


# ─── Store Chunks (with optional embeddings) ──────────────────────────────────

async def store_meeting_chunks(meeting_id: str, transcript: str):
    """Chunk transcript, try to embed each chunk, store in MongoDB."""
    await db.db["chunks"].delete_many({"meeting_id": ObjectId(meeting_id)})
    chunks = chunk_text(transcript)

    # Try to get embeddings, fall back to storing text-only
    embeddings = None
    try:
        from app.services.embeddings import get_embeddings_batch
        embeddings = await get_embeddings_batch(chunks)
        logger.info(f"Stored {len(chunks)} chunks with embeddings for meeting {meeting_id}")
    except Exception as e:
        logger.warning(f"Embedding failed, storing chunks without vectors: {e}")

    chunk_docs = [
        {
            "meeting_id": ObjectId(meeting_id),
            "text": chunk,
            "embedding": embeddings[idx] if embeddings else None,
            "chunk_index": idx,
            "created_at": datetime.utcnow()
        }
        for idx, chunk in enumerate(chunks)
    ]

    if chunk_docs:
        await db.db["chunks"].insert_many(chunk_docs)

    return len(chunk_docs)


# ─── Cosine Similarity ─────────────────────────────────────────────────────────

def cosine_similarity(a: List[float], b: List[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x ** 2 for x in a))
    norm_b = math.sqrt(sum(x ** 2 for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


# ─── Text-Based Keyword Fallback ──────────────────────────────────────────────

def keyword_score(question: str, text: str) -> float:
    """Simple keyword overlap scoring as fallback for embedding search."""
    q_words = set(question.lower().split())
    t_words = set(text.lower().split())
    stop_words = {"a", "an", "the", "is", "it", "in", "on", "at", "to", "for", "of", "and", "or", "what", "who", "when", "how", "where", "were", "was"}
    q_words -= stop_words
    if not q_words:
        return 0.0
    return len(q_words & t_words) / len(q_words)


# ─── Retrieval (Vector → Keyword fallback) ────────────────────────────────────

async def retrieve_relevant_chunks(
    question: str,
    meeting_id: Optional[str] = None,
    top_k: int = 5
) -> List[str]:
    """Retrieve relevant transcript chunks.
    
    Primary: cosine similarity on embeddings.
    Fallback 1: keyword search on stored chunks.
    Fallback 2: grab transcript directly from meetings collection.
    """
    query = {}
    if meeting_id:
        query["meeting_id"] = ObjectId(meeting_id)

    # ── Try vector search first ──
    try:
        from app.services.embeddings import get_embedding
        question_embedding = await get_embedding(question)

        cursor = db.db["chunks"].find(query, {"text": 1, "embedding": 1})
        chunks = await cursor.to_list(length=1000)

        if chunks and all(c.get("embedding") for c in chunks):
            scored = [
                (cosine_similarity(question_embedding, c["embedding"]), c["text"])
                for c in chunks
            ]
            scored.sort(key=lambda x: x[0], reverse=True)
            logger.info(f"Vector search returned {len(scored[:top_k])} chunks")
            return [text for _, text in scored[:top_k]]

    except Exception as e:
        logger.warning(f"Vector search failed, falling back to keyword: {e}")

    # ── Fallback 1: Keyword search on chunks ──
    try:
        cursor = db.db["chunks"].find(query, {"text": 1})
        chunks = await cursor.to_list(length=1000)

        if chunks:
            scored = [(keyword_score(question, c["text"]), c["text"]) for c in chunks]
            scored.sort(key=lambda x: x[0], reverse=True)
            top = [text for score, text in scored[:top_k] if score > 0] or [c["text"] for _, c in enumerate(chunks[:top_k])]
            logger.info(f"Keyword search on chunks returned {len(top)} results")
            return top
    except Exception as e:
        logger.warning(f"Chunk keyword search failed: {e}")

    # ── Fallback 2: Pull directly from meetings transcripts ──
    try:
        meet_query = {}
        if meeting_id:
            meet_query["_id"] = ObjectId(meeting_id)

        cursor = db.db["meetings"].find(meet_query, {"transcript": 1, "title": 1})
        meetings = await cursor.to_list(length=20)

        all_chunks = []
        for m in meetings:
            transcript = m.get("transcript", "")
            if transcript:
                text_chunks = chunk_text(transcript, chunk_size=300)
                all_chunks.extend(text_chunks)

        if all_chunks:
            scored = [(keyword_score(question, c), c) for c in all_chunks]
            scored.sort(key=lambda x: x[0], reverse=True)
            top = [text for score, text in scored[:top_k] if score > 0] or all_chunks[:top_k]
            logger.info(f"Direct transcript fallback returned {len(top)} chunks")
            return top

    except Exception as e:
        logger.error(f"All retrieval methods failed: {e}")

    return []


# ─── RAG Answer Generation ────────────────────────────────────────────────────

async def generate_rag_answer(question: str, context_chunks: List[str]) -> str:
    """Send retrieved context + question to LLM and get a grounded answer."""
    context = "\n\n---\n\n".join(context_chunks)

    system_prompt = """You are an intelligent meeting assistant.
You answer questions about meeting transcripts using ONLY the provided context.
If the answer is not in the context, say "I couldn't find that information in the meeting transcripts."
Be concise and accurate."""

    prompt = f"""Context from meeting transcripts:
{context}

Question: {question}

Answer based on the context above:"""

    try:
        result = await ai_service.generate_response(prompt=prompt, system_prompt=system_prompt)
        if "error" in result:
            raise Exception(str(result["error"]))
        return result["choices"][0]["message"]["content"]
    except Exception as e:
        logger.error(f"LLM generation failed: {e}")
        raise Exception(f"AI generation failed: {str(e)}")
