# pyrefly: ignore [missing-import]
import httpx
from app.core.config import settings

class AIService:
    def __init__(self):
        self.api_key = settings.OPENROUTER_API_KEY
        self.base_url = "https://openrouter.ai/api/v1"
        self.model = settings.OPENROUTER_MODEL

    async def generate_response(self, prompt: str, system_prompt: str = "You are a helpful assistant."):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": settings.SITE_URL,
            "X-Title": settings.SITE_NAME,
        }
        
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ]
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=60.0
                )
            except httpx.TimeoutException:
                return {"error": "AI request timed out. Please try again."}
            except Exception as e:
                return {"error": f"Network error: {str(e)}"}

            if response.status_code != 200:
                return {"error": f"API Error {response.status_code}: {response.text[:200]}"}

            return response.json()

ai_service = AIService()
