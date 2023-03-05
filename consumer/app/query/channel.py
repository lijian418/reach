from app.core.db import channel_collection


async def get_by_slug(slug: str) -> dict:
    entity = await channel_collection.find_one({"slug": slug})
    return entity
