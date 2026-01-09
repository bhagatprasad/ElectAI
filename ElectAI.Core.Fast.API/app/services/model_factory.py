from app.core.config import settings
from app.models.llm_providers import OpenAILLM

class ModelFactory:

    @staticmethod
    def get_llm():
        if settings.DEFAULT_LLM_PROVIDER == "openai":
            return OpenAILLM()
        raise ValueError("Unsupported LLM provider")
