from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str | None = None
    DEFAULT_LLM_PROVIDER: str = "openai"

    class Config:
        env_file = ".env"

settings = Settings()
