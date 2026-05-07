from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime
from bson import ObjectId
from app.models.user import UserRegister, UserLogin, UserResponse, TokenResponse
from app.core.security import get_password_hash, verify_password, create_access_token
from app.services.mongodb import db
from app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

def format_user(user: dict) -> UserResponse:
    return UserResponse(
        id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        created_at=user["created_at"]
    )

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(data: UserRegister):
    # Check if email already exists
    existing = await db.db["users"].find_one({"email": data.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create user document
    user_doc = {
        "name": data.name,
        "email": data.email,
        "password": get_password_hash(data.password),
        "created_at": datetime.utcnow(),
    }

    result = await db.db["users"].insert_one(user_doc)
    user_doc["_id"] = result.inserted_id

    token = create_access_token(data={"sub": str(result.inserted_id)})

    return TokenResponse(
        access_token=token,
        user=format_user(user_doc)
    )

@router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin):
    user = await db.db["users"].find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token(data={"sub": str(user["_id"])})

    return TokenResponse(
        access_token=token,
        user=format_user(user)
    )

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return format_user(current_user)
