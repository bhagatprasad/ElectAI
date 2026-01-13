from fastapi import APIRouter, HTTPException
import feedparser

router = APIRouter()

RSS_SOURCES = {
    "economictimes": "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
    "mint": "https://www.livemint.com/rss/companies",
    "businessstandard": "https://www.business-standard.com/rss/home_page_top_stories.rss",
    "moneycontrol": "https://www.moneycontrol.com/rss/buzzingstocks.xml",
    "ndtvprofit": "https://feeds.feedburner.com/ndtvprofit-latest"
}

@router.get("/")
def list_sources():
    return {"sources": list(RSS_SOURCES.keys())}


@router.get("/{source}")
def get_rss_feed(source: str):
    if source not in RSS_SOURCES:
        raise HTTPException(status_code=404, detail="Invalid RSS source")

    feed = feedparser.parse(RSS_SOURCES[source])

    return {
        "source": source,
        "title": feed.feed.get("title"),
        "items": [
            {
                "title": entry.get("title"),
                "link": entry.get("link"),
                "published": entry.get("published"),
                "summary": entry.get("summary")
            }
            for entry in feed.entries[:20]
        ]
    }
