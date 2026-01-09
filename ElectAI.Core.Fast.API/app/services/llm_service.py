from app.services.model_factory import ModelFactory

class LLMService:

    def __init__(self):
        self.llm = ModelFactory.get_llm()

    async def generate(self, prompt: str) -> str:
        return await self.llm.generate(prompt)
