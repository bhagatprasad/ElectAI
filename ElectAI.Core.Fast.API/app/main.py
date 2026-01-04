from fastapi import FastAPI
from app.api.v1.api import api_router

app = FastAPI(
    title="ElectAI Core Fast API",
    version="1.0.0"
)

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "ElectAI FastAPI is running"}
