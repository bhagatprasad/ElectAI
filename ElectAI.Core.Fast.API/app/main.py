from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.routers import llm, vision, audio, embeddings, rss

app = FastAPI(
    title="ElectAI - AI Integration API",
    version="1.0.0"
)

# ✅ CORS CONFIG (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",  # Angular
        "http://127.0.0.1:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(llm.router, prefix="/api/v1/llm", tags=["LLM"])
app.include_router(vision.router, prefix="/api/v1/vision", tags=["Vision"])
app.include_router(audio.router, prefix="/api/v1/audio", tags=["Audio"])
app.include_router(embeddings.router, prefix="/api/v1/embeddings", tags=["Embeddings"])
app.include_router(rss.router, prefix="/api/v1/rss", tags=["RSS"])
