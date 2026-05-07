from typing import List, Optional
from datetime import datetime
from bson import ObjectId
import math

from app.services.mongodb import db
from app.services.embeddings import get_embedding, get_embeddings_batch
from app.services.ai import ai_service

# ─── Chunking ─────────────────────────────────────────────────────────────────

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    """Split transcript into overlapping chunks for better retrieval."""
    words = text.split()
    chunks = []
    step = chunk_size - overlap

    for i in range(0, len(words), step):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)

    return chunks


# ─── Store Chunks with Embeddings ─────────────────────────────────────────────

async def store_meeting_chunks(meeting_id: str, transcript: str):
    """Chunk transcript, embed each chunk, store in MongoDB."""
    # Remove old chunks for this meeting first
    await db.db["chunks"].delete_many({"meeting_id": ObjectId(meeting_id)})

    chunks = chunk_text(transcript)
    embeddings = await get_embeddings_batch(chunks)

    chunk_docs = [
        {
            "meeting_id": ObjectId(meeting_id),
            "text": chunk,
            "embedding": embedding,
            "chunk_index": idx,
            "created_at": datetime.utcnow()
        }
        for idx, (chunk, embedding) in enumerate(zip(chunks, embeddings))
    ]

    if chunk_docs:
        await db.db["chunks"].insert_many(chunk_docs)

    return len(chunk_docs)


# ─── Cosine Similarity Retrieval ──────────────────────────────────────────────

def cosine_similarity(a: List[float], b: List[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x ** 2 for x in a))
    norm_b = math.sqrt(sum(x ** 2 for x in b))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot / (norm_a * norm_b)


async def retrieve_relevant_chunks(
    question: str,
    meeting_id: Optional[str] = None,
    top_k: int = 5
) -> List[str]:
    """Embed question, find most relevant transcript chunks via cosine similarity."""
    question_embedding = await get_embedding(question)

    # Build query filter
    query = {}
    if meeting_id:
        query["meeting_id"] = ObjectId(meeting_id)

    # Fetch all chunks (with embedding)
    cursor = db.db["chunks"].find(query, {"text": 1, "embedding": 1})
    chunks = await cursor.to_list(length=1000)

    if not chunks:
        return []

    # Score each chunk
    scored = [
        (cosine_similarity(question_embedding, c["embedding"]), c["text"])
        for c in chunks
    ]
    scored.sort(key=lambda x: x[0], reverse=True)

    return [text for _, text in scored[:top_k]]


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

    result = await ai_service.generate_response(prompt=prompt, system_prompt=system_prompt)

    if "error" in result:
        raise Exception(result["error"])

    return result["choices"][0]["message"]["content"]
