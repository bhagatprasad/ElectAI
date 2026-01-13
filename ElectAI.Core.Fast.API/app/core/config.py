from pydantic_settings import BaseSettings
from typing import Dict


class Settings(BaseSettings):
    # Existing settings
    OPENAI_API_KEY: str | None = None
    DEFAULT_LLM_PROVIDER: str = "openai"

    # ✅ RSS Feeds
    BUSINESS_RSS_FEEDS: Dict[str, str] = {
        "economictimes": "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
        "mint": "https://www.livemint.com/rss/companies",
        "business_standard": "https://www.business-standard.com/rss/home_page_top_stories.rss",
        "moneycontrol": "https://www.moneycontrol.com/rss/buzzingstocks.xml",
        "ndtv_profit": "https://feeds.feedburner.com/ndtvprofit-latest"
    }

    class Config:
        env_file = ".env"


settings = Settings()
