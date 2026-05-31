# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException, Depends, Request
from app.models.chat import ChatRequest, ChatResponse, ChatSessionSummary, ChatSessionResponse, ChatMessage
from app.services.rag import retrieve_relevant_chunks, generate_rag_answer
from app.api.deps import get_current_user
from app.core.rate_limit import limiter
from app.services.mongodb import db
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/chat", tags=["RAG Chat"])

@router.get("/sessions", response_model=list[ChatSessionSummary])
async def get_sessions(current_user: dict = Depends(get_current_user)):
    """Get all chat sessions for the current user."""
    cursor = db.db["chat_sessions"].find({"user_id": str(current_user["_id"])}).sort("updated_at", -1)
    sessions = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        sessions.append(ChatSessionSummary(**doc))
    return sessions

@router.get("/sessions/{session_id}", response_model=ChatSessionResponse)
async def get_session(session_id: str, current_user: dict = Depends(get_current_user)):
    """Get a specific chat session with its messages."""
    try:
        doc = await db.db["chat_sessions"].find_one({"_id": ObjectId(session_id), "user_id": str(current_user["_id"])})
    except:
        raise HTTPException(status_code=400, detail="Invalid session ID")
    
    if not doc:
        raise HTTPException(status_code=404, detail="Session not found")
        
    doc["id"] = str(doc["_id"])
    return ChatSessionResponse(**doc)

@router.delete("/sessions/{session_id}")
async def delete_session(session_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a chat session."""
    try:
        result = await db.db["chat_sessions"].delete_one({"_id": ObjectId(session_id), "user_id": str(current_user["_id"])})
    except:
        raise HTTPException(status_code=400, detail="Invalid session ID")
        
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"message": "Session deleted"}

@router.delete("/sessions/{session_id}/messages/{message_id}")
async def delete_message(session_id: str, message_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a specific message from a session."""
    try:
        result = await db.db["chat_sessions"].update_one(
            {"_id": ObjectId(session_id), "user_id": str(current_user["_id"])},
            {"$pull": {"messages": {"id": message_id}}, "$set": {"updated_at": datetime.utcnow()}}
        )
    except:
        raise HTTPException(status_code=400, detail="Invalid IDs")
        
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Session or message not found")
    return {"message": "Message deleted"}

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
    session_id = payload.session_id
    session = None
    
    # Generate the question title if new session
    title = payload.question[:40] + "..." if len(payload.question) > 40 else payload.question

    if session_id:
        try:
            session = await db.db["chat_sessions"].find_one({"_id": ObjectId(session_id), "user_id": str(current_user["_id"])})
        except:
            pass
            
    if not session:
        # Create a new session
        session_doc = {
            "user_id": str(current_user["_id"]),
            "meeting_id": payload.meeting_id,
            "title": title,
            "messages": [],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        result = await db.db["chat_sessions"].insert_one(session_doc)
        session_id = str(result.inserted_id)
        
    # Append user question
    user_msg = ChatMessage(role="user", content=payload.question)
    await db.db["chat_sessions"].update_one(
        {"_id": ObjectId(session_id)},
        {"$push": {"messages": user_msg.model_dump()}, "$set": {"updated_at": datetime.utcnow()}}
    )

    try:
        # Retrieve relevant chunks
        chunks = await retrieve_relevant_chunks(
            question=payload.question,
            meeting_id=payload.meeting_id,
            top_k=5
        )

        if not chunks:
            answer = "No relevant meeting content found. Please upload a meeting transcript first."
            sources_count = 0
        else:
            # Generate grounded answer using LLM
            answer = await generate_rag_answer(
                question=payload.question,
                context_chunks=chunks
            )
            sources_count = len(chunks)

        # Append assistant answer
        assistant_msg = ChatMessage(role="assistant", content=answer)
        await db.db["chat_sessions"].update_one(
            {"_id": ObjectId(session_id)},
            {"$push": {"messages": assistant_msg.model_dump()}, "$set": {"updated_at": datetime.utcnow()}}
        )

        return ChatResponse(
            answer=answer,
            question=payload.question,
            sources_count=sources_count,
            meeting_id=payload.meeting_id,
            session_id=session_id,
            message_id=assistant_msg.id
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG error: {str(e)}")
