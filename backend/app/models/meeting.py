# pyrefly: ignore [missing-import]
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class MeetingStatus(str, Enum):
    pending = "pending"
    processing = "processing"
    completed = "completed"
    failed = "failed"

class MeetingUpload(BaseModel):
    title: str = Field(..., min_length=2, max_length=200)
    transcript: str = Field(..., min_length=10)
    participants: Optional[List[str]] = []
    meeting_date: Optional[datetime] = None
    tags: Optional[List[str]] = []

class MeetingResponse(BaseModel):
    id: str
    title: str
    transcript: str
    participants: List[str]
    meeting_date: Optional[datetime]
    tags: List[str]
    status: MeetingStatus
    summary: Optional[str] = None
    action_items: Optional[List[str]] = []
    key_decisions: Optional[List[str]] = []
    owner_id: str
    created_at: datetime

class MeetingListItem(BaseModel):
    id: str
    title: str
    participants: List[str]
    meeting_date: Optional[datetime]
    tags: List[str]
    status: MeetingStatus
    summary: Optional[str] = None
    created_at: datetime
