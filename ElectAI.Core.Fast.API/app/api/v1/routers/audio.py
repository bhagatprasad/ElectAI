from fastapi import APIRouter

router = APIRouter()

@router.post("/speech-to-text")
async def speech_to_text():
    return {"message": "Audio model not implemented yet"}
