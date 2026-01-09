from fastapi import APIRouter
from app.models.schemas import LLMRequest, LLMResponse
from app.services.llm_service import LLMService

router = APIRouter()

@router.post("/chat", response_model=LLMResponse)
async def chat(request: LLMRequest):
    service = LLMService()
    result = await service.generate(request.prompt)
    return LLMResponse(response=result)
