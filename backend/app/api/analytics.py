# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends
from typing import Dict, Any
from datetime import datetime, timedelta
# pyrefly: ignore [missing-import]
from bson import ObjectId

from app.api.deps import get_current_user
from app.models.user import UserInDB
from app.services.mongodb import db

router = APIRouter()

@router.get("/")
async def get_analytics(current_user: UserInDB = Depends(get_current_user)) -> Dict[str, Any]:
    """
    Get aggregated analytics data for the current user.
    """
    user_id = current_user.id

    # Fetch all meetings for the user
    cursor = db.db["meetings"].find({"user_id": ObjectId(user_id)})
    meetings = await cursor.to_list(length=None)

    total_meetings = len(meetings)
    completed_meetings = [m for m in meetings if m.get("status") == "completed"]
    
    # Estimate total hours based on transcript length (avg 150 words per minute)
    total_words = sum(len(m.get("transcript", "").split()) for m in completed_meetings)
    total_minutes = total_words / 150
    total_hours = round(total_minutes / 60, 1)

    # Calculate total action items
    total_action_items = sum(len(m.get("action_items", [])) for m in completed_meetings)
    
    # Mock completion rate (since we don't track individual task status yet)
    done_items = int(total_action_items * 0.6)
    pending_items = total_action_items - done_items

    # Generate Monthly Trend Data (Last 5 months)
    now = datetime.utcnow()
    trend_data = []
    for i in range(4, -1, -1):
        target_month = (now.replace(day=1) - timedelta(days=30 * i)).strftime("%b")
        # Rough mock logic for trend based on actual meetings
        month_meetings = [m for m in completed_meetings if m.get("created_at") and m["created_at"].strftime("%b") == target_month]
        trend_data.append({
            "m": target_month,
            "v": len(month_meetings) * 10 + 20 # Mock score based on count
        })

    # Participation (Mocked for now as we don't have speaker diarization)
    participation_data = [
        {"name": "You", "v": 45},
        {"name": "Team A", "v": 25},
        {"name": "Team B", "v": 15},
        {"name": "Clients", "v": 15},
    ]

    return {
        "overview": {
            "total_hours": total_hours,
            "participation_score": 4.6, # Mock score
            "completed": len(completed_meetings),
            "productivity": 85 if total_meetings > 0 else 0, # Mock %
        },
        "velocity": {
            "done": done_items,
            "pending": pending_items,
        },
        "trend": trend_data,
        "participation": participation_data,
        "keywords": [
            "Project Alpha", "Deployment", "Q3 Goals", "Budget", "API Review"
        ] # Mock top keywords
    }
