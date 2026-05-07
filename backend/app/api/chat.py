# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException, Depends, Request
from app.models.chat import ChatRequest, ChatResponse
from app.services.rag import retrieve_relevant_chunks, generate_rag_answer
from app.api.deps import get_current_user
from app.core.rate_limit import limiter

router = APIRouter(prefix="/chat", tags=["RAG Chat"])

@router.post("/", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(
    request: Request,
    payload: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    Ask a question about your meetings.
    - Pass `meeting_id` to query a specific meeting.
    - Leave `meeting_id` empty to search across ALL your meetings.
    """
    try:
        # Retrieve relevant chunks
        chunks = await retrieve_relevant_chunks(
            question=payload.question,
            meeting_id=payload.meeting_id,
            top_k=5
        )

        if not chunks:
            return ChatResponse(
                answer="No relevant meeting content found. Please upload a meeting transcript first.",
                question=payload.question,
                sources_count=0,
                meeting_id=payload.meeting_id
            )

        # Generate grounded answer using LLM
        answer = await generate_rag_answer(
            question=payload.question,
            context_chunks=chunks
        )

        return ChatResponse(
            answer=answer,
            question=payload.question,
            sources_count=len(chunks),
            meeting_id=payload.meeting_id
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG error: {str(e)}")
