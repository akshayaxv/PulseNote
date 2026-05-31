# pyrefly: ignore [missing-import]
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    role: str
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=1000)
    meeting_id: Optional[str] = None  # If None, search across ALL meetings
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    question: str
    sources_count: int
    meeting_id: Optional[str] = None
    session_id: str
    message_id: str

class ChatSessionCreate(BaseModel):
    meeting_id: Optional[str] = None
    title: str = "New Chat Session"

class ChatSessionSummary(BaseModel):
    id: str
    user_id: str
    meeting_id: Optional[str] = None
    title: str
    created_at: datetime
    updated_at: datetime

class ChatSessionResponse(ChatSessionSummary):
    messages: List[ChatMessage] = []
