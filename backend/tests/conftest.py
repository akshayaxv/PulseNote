import pytest
from unittest.mock import MagicMock, AsyncMock
import sys
import os

# Add the backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

@pytest.fixture(autouse=True)
def mock_mongodb(monkeypatch):
    """Mock MongoDB connection to avoid network calls during tests."""
    mock_db = MagicMock()
    mock_client = MagicMock()
    
    # Mock the connect/close functions
    monkeypatch.setattr("app.services.mongodb.connect_to_mongo", AsyncMock())
    monkeypatch.setattr("app.services.mongodb.close_mongo_connection", AsyncMock())
    
    # Mock the db instance
    from app.services.mongodb import db
    db.client = mock_client
    db.db = mock_db
    
    return mock_db
