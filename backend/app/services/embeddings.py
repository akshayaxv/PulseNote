# pyrefly: ignore [missing-import]
import httpx
from typing import List
from app.core.config import settings

OPENROUTER_BASE = "https://openrouter.ai/api/v1"

async def get_embedding(text: str) -> List[float]:
    """Get vector embedding for a piece of text via OpenRouter."""
    headers = {
        "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
        "HTTP-Referer": settings.SITE_URL,
        "X-Title": settings.SITE_NAME,
    }
    payload = {
        "model": settings.EMBEDDING_MODEL,
        "input": text
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{OPENROUTER_BASE}/embeddings",
            headers=headers,
            json=payload,
            timeout=30.0
        )

    if response.status_code != 200:
        raise Exception(f"Embedding API error: {response.text}")

    return response.json()["data"][0]["embedding"]


async def get_embeddings_batch(texts: List[str]) -> List[List[float]]:
    """Get embeddings for multiple texts."""
    results = []
    for text in texts:
        embedding = await get_embedding(text)
        results.append(embedding)
    return results
