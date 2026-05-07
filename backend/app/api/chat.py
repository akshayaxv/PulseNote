from fastapi import APIRouter, HTTPException, Depends
from app.models.chat import ChatRequest, ChatResponse
from app.services.rag import retrieve_relevant_chunks, generate_rag_answer
from app.api.deps import get_current_user

router = APIRouter(prefix="/chat", tags=["RAG Chat"])

@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
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
            question=request.question,
            meeting_id=request.meeting_id,
            top_k=5
        )

        if not chunks:
            return ChatResponse(
                answer="No relevant meeting content found. Please upload a meeting transcript first.",
                question=request.question,
                sources_count=0,
                meeting_id=request.meeting_id
            )

        # Generate grounded answer using LLM
        answer = await generate_rag_answer(
            question=request.question,
            context_chunks=chunks
        )

        return ChatResponse(
            answer=answer,
            question=request.question,
            sources_count=len(chunks),
            meeting_id=request.meeting_id
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG error: {str(e)}")
