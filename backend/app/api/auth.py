# pyrefly: ignore [missing-import]
from fastapi import APIRouter, HTTPException, status, Depends
# pyrefly: ignore [missing-import]
from fastapi.responses import RedirectResponse
from datetime import datetime
# pyrefly: ignore [missing-import]
from bson import ObjectId
# pyrefly: ignore [missing-import]
import httpx

from app.models.user import UserRegister, UserLogin, UserResponse, TokenResponse, UserUpdate
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.config import settings
from app.services.mongodb import db
from app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

# ─── Helpers ─────────────────────────────────────────────────────────────────

def format_user(user: dict) -> UserResponse:
    return UserResponse(
        id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        created_at=user["created_at"]
    )

# ─── Email/Password Auth ──────────────────────────────────────────────────────

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(data: UserRegister):
    existing = await db.db["users"].find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_doc = {
        "name": data.name,
        "email": data.email,
        "password": get_password_hash(data.password),
        "auth_provider": "email",
        "created_at": datetime.utcnow(),
    }

    result = await db.db["users"].insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    token = create_access_token(data={"sub": str(result.inserted_id)})

    return TokenResponse(access_token=token, user=format_user(user_doc))


@router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin):
    user = await db.db["users"].find_one({"email": data.email})
    if not user or not user.get("password"):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(data={"sub": str(user["_id"])})
    return TokenResponse(access_token=token, user=format_user(user))


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return format_user(current_user)


@router.put("/me", response_model=UserResponse)
async def update_me(data: UserUpdate, current_user: dict = Depends(get_current_user)):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    
    if not update_data:
        return format_user(current_user)

    if "email" in update_data and update_data["email"] != current_user["email"]:
        existing = await db.db["users"].find_one({"email": update_data["email"]})
        if existing:
            raise HTTPException(status_code=400, detail="Email already taken")

    await db.db["users"].update_one(
        {"_id": current_user["_id"]},
        {"$set": update_data}
    )
    
    updated_user = await db.db["users"].find_one({"_id": current_user["_id"]})
    return format_user(updated_user)


# ─── Google OAuth ─────────────────────────────────────────────────────────────

@router.get("/google/login")
async def google_login():
    """Redirect user to Google's OAuth consent screen."""
    params = (
        f"?client_id={settings.GOOGLE_CLIENT_ID}"
        f"&redirect_uri={settings.GOOGLE_REDIRECT_URI}"
        f"&response_type=code"
        f"&scope=openid%20email%20profile"
        f"&access_type=offline"
    )
    return RedirectResponse(url=GOOGLE_AUTH_URL + params)


@router.get("/google/callback")
async def google_callback(code: str):
    """Handle Google's callback and return a JWT token."""
    # 1. Exchange code for tokens
    async with httpx.AsyncClient() as client:
        token_resp = await client.post(
            GOOGLE_TOKEN_URL,
            data={
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code",
            }
        )
    
    if token_resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to get Google token")

    access_token = token_resp.json().get("access_token")

    # 2. Get user info from Google
    async with httpx.AsyncClient() as client:
        user_resp = await client.get(
            GOOGLE_USERINFO_URL,
            headers={"Authorization": f"Bearer {access_token}"}
        )

    if user_resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to get Google user info")

    google_user = user_resp.json()
    email = google_user.get("email")
    name = google_user.get("name", email)
    google_id = google_user.get("sub")

    # 3. Find or create user in MongoDB
    user = await db.db["users"].find_one({"email": email})

    if not user:
        user_doc = {
            "name": name,
            "email": email,
            "google_id": google_id,
            "password": None,
            "auth_provider": "google",
            "created_at": datetime.utcnow(),
        }
        result = await db.db["users"].insert_one(user_doc)
        user_doc["_id"] = result.inserted_id
        user = user_doc

    # 4. Return JWT + redirect to frontend with user info
    jwt_token = create_access_token(data={"sub": str(user["_id"])})

    import urllib.parse
    frontend_url = (
        f"{settings.SITE_URL}/auth/callback"
        f"?token={jwt_token}"
        f"&id={str(user['_id'])}"
        f"&name={urllib.parse.quote(user.get('name', ''))}"
        f"&email={urllib.parse.quote(user.get('email', ''))}"
    )
    return RedirectResponse(url=frontend_url)
