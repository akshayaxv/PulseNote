# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
import uvicorn
from app.core.config import settings
from app.api.auth import router as auth_router
from app.api.meetings import router as meetings_router
from app.api.chat import router as chat_router
from app.api.analytics import router as analytics_router
from contextlib import asynccontextmanager
from app.services.mongodb import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

app = FastAPI(
    title="PulseNoteAI API",
    description="Backend API for PulseNoteAI - AI Meeting Assistant powered by RAG",
    version="1.0.0",
    lifespan=lifespan
)

# pyrefly: ignore [missing-import]
from slowapi.errors import RateLimitExceeded
# pyrefly: ignore [missing-import]
from slowapi.middleware import SlowAPIMiddleware
from app.core.rate_limit import limiter, _rate_limit_exceeded_handler

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up Rate Limiting
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(meetings_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")
app.include_router(analytics_router, prefix="/api/v1/analytics")

@app.get("/")
async def root():
    return {"message": "Welcome to AI Meeting Tracker API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
