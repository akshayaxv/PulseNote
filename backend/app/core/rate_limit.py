# pyrefly: ignore [missing-import]
from slowapi import Limiter, _rate_limit_exceeded_handler
# pyrefly: ignore [missing-import]
from slowapi.util import get_remote_address
# pyrefly: ignore [missing-import]
from fastapi import Request

# Function to get the current user ID for rate limiting, falling back to IP address
def get_user_identifier(request: Request) -> str:
    # If the user is authenticated and attached to the request state
    if hasattr(request.state, "user_id"):
        return str(request.state.user_id)
    # Fallback to IP address for unauthenticated routes (like login/register)
    return get_remote_address(request)

# Initialize the Limiter
limiter = Limiter(key_func=get_user_identifier)
