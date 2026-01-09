from app.models.base import BaseLLM

class OpenAILLM(BaseLLM):
    async def generate(self, prompt: str) -> str:
        return f"OpenAI response to: {prompt}"
