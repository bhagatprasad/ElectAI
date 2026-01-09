from fastapi import FastAPI
from app.api.v1.routers import llm, vision, audio, embeddings

app = FastAPI(
    title="ElectAI - AI Integration API",
    version="1.0.0"
)

app.include_router(llm.router, prefix="/api/v1/llm", tags=["LLM"])
app.include_router(vision.router, prefix="/api/v1/vision", tags=["Vision"])
app.include_router(audio.router, prefix="/api/v1/audio", tags=["Audio"])
app.include_router(embeddings.router, prefix="/api/v1/embeddings", tags=["Embeddings"])
