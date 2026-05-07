from pydantic import BaseModel, Field
from typing import Optional, List

class ChatRequest(BaseModel):
    question: str = Field(..., min_length=3, max_length=1000)
    meeting_id: Optional[str] = None  # If None, search across ALL meetings

class ChatResponse(BaseModel):
    answer: str
    question: str
    sources_count: int
    meeting_id: Optional[str] = None
