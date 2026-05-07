# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException, status, Depends, BackgroundTasks
from datetime import datetime
# pyrefly: ignore [missing-import]
from bson import ObjectId
from typing import List

from app.models.meeting import MeetingUpload, MeetingResponse, MeetingListItem, MeetingStatus
from app.services.mongodb import db
from app.services.ai import ai_service
from app.services.rag import store_meeting_chunks
from app.api.deps import get_current_user

router = APIRouter(prefix="/meetings", tags=["Meetings"])

# ─── Helpers ──────────────────────────────────────────────────────────────────

def format_meeting(m: dict) -> MeetingResponse:
    return MeetingResponse(
        id=str(m["_id"]),
        title=m["title"],
        transcript=m["transcript"],
        participants=m.get("participants", []),
        meeting_date=m.get("meeting_date"),
        tags=m.get("tags", []),
        status=m.get("status", MeetingStatus.pending),
        summary=m.get("summary"),
        action_items=m.get("action_items", []),
        key_decisions=m.get("key_decisions", []),
        owner_id=str(m["owner_id"]),
        created_at=m["created_at"]
    )

def format_list_item(m: dict) -> MeetingListItem:
    return MeetingListItem(
        id=str(m["_id"]),
        title=m["title"],
        participants=m.get("participants", []),
        meeting_date=m.get("meeting_date"),
        tags=m.get("tags", []),
        status=m.get("status", MeetingStatus.pending),
        summary=m.get("summary"),
        created_at=m["created_at"]
    )

# ─── Background AI Processing ─────────────────────────────────────────────────

async def process_meeting_with_ai(meeting_id: str, transcript: str):
    """Runs in background: summarize meeting, extract action items & decisions."""
    try:
        await db.db["meetings"].update_one(
            {"_id": ObjectId(meeting_id)},
            {"$set": {"status": MeetingStatus.processing}}
        )

        system_prompt = """You are an expert meeting analyst. 
When given a meeting transcript, extract:
1. A concise summary (2-3 sentences)
2. Action items (tasks assigned to people)
3. Key decisions made

Always respond in this exact JSON format:
{
  "summary": "...",
  "action_items": ["...", "..."],
  "key_decisions": ["...", "..."]
}"""

        result = await ai_service.generate_response(
            prompt=f"Analyze this meeting transcript:\n\n{transcript}",
            system_prompt=system_prompt
        )

        # Parse AI response
        import json, re
        content = result["choices"][0]["message"]["content"]
        json_match = re.search(r'\{.*\}', content, re.DOTALL)

        if json_match:
            parsed = json.loads(json_match.group())
            await db.db["meetings"].update_one(
                {"_id": ObjectId(meeting_id)},
                {"$set": {
                    "status": MeetingStatus.completed,
                    "summary": parsed.get("summary", ""),
                    "action_items": parsed.get("action_items", []),
                    "key_decisions": parsed.get("key_decisions", []),
                    "processed_at": datetime.utcnow()
                }}
            )
            # Store chunks for RAG
            await store_meeting_chunks(meeting_id, transcript)
        else:
            raise ValueError("Could not parse AI response")

    except Exception as e:
        await db.db["meetings"].update_one(
            {"_id": ObjectId(meeting_id)},
            {"$set": {"status": MeetingStatus.failed, "error": str(e)}}
        )

# ─── Routes ───────────────────────────────────────────────────────────────────

@router.post("/upload", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
async def upload_meeting(
    data: MeetingUpload,
    background_tasks: BackgroundTasks,
    current_user: dict = Depends(get_current_user)
):
    """Upload a meeting transcript. AI processing runs in the background."""
    meeting_doc = {
        "title": data.title,
        "transcript": data.transcript,
        "participants": data.participants,
        "meeting_date": data.meeting_date or datetime.utcnow(),
        "tags": data.tags,
        "status": MeetingStatus.pending,
        "summary": None,
        "action_items": [],
        "key_decisions": [],
        "owner_id": ObjectId(str(current_user["_id"])),
        "created_at": datetime.utcnow(),
    }

    result = await db.db["meetings"].insert_one(meeting_doc)
    meeting_doc["_id"] = result.inserted_id

    # Kick off AI processing in the background
    background_tasks.add_task(
        process_meeting_with_ai,
        str(result.inserted_id),
        data.transcript
    )

    return format_meeting(meeting_doc)


@router.get("/", response_model=List[MeetingListItem])
async def list_meetings(current_user: dict = Depends(get_current_user)):
    """Get all meetings for the logged-in user."""
    cursor = db.db["meetings"].find(
        {"owner_id": ObjectId(str(current_user["_id"]))},
        sort=[("created_at", -1)]
    )
    meetings = await cursor.to_list(length=100)
    return [format_list_item(m) for m in meetings]


@router.get("/{meeting_id}", response_model=MeetingResponse)
async def get_meeting(meeting_id: str, current_user: dict = Depends(get_current_user)):
    """Get a single meeting by ID."""
    try:
        oid = ObjectId(meeting_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid meeting ID")

    meeting = await db.db["meetings"].find_one({
        "_id": oid,
        "owner_id": ObjectId(str(current_user["_id"]))
    })

    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    return format_meeting(meeting)


@router.delete("/{meeting_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_meeting(meeting_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a meeting."""
    try:
        oid = ObjectId(meeting_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid meeting ID")

    result = await db.db["meetings"].delete_one({
        "_id": oid,
        "owner_id": ObjectId(str(current_user["_id"]))
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Meeting not found")
