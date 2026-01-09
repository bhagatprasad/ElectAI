from fastapi import APIRouter

router = APIRouter()

@router.post("/")
async def create_embeddings():
    return {"message": "Embeddings not implemented yet"}
