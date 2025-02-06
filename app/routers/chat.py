from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.services.chatgpt_service import call_gpt

router = APIRouter(prefix="/chat", tags=["Chatbot"])

class ChatRequest(BaseModel):
    text: str

@router.post("/")
async def chat_with_gpt(request: ChatRequest) -> dict:
    return call_gpt(request.text, "")