import pymongo

from core.db import channel_collection
from models.business.channel import ChannelCreate, ChannelRead, ChannelSearch, ChannelPaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: ChannelCreate) -> ChannelRead:
    new_entity = await channel_collection.insert_one(payload.dict())
    created_entity = await channel_collection.find_one({"_id": new_entity.inserted_id})
    return ChannelRead(**created_entity)


async def get(entity_id: PyObjectId) -> ChannelRead:
    entity = await channel_collection.find_one({"_id": entity_id})
    return ChannelRead(**entity)


async def update(entity_id: PyObjectId, payload) -> ChannelRead:
    await channel_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await channel_collection.find_one({"_id": entity_id})
    return ChannelRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await channel_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: ChannelSearch) -> ChannelPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await channel_collection.aggregate(pipeline).to_list(length=None)
    total = await channel_collection.count_documents(query)

    return ChannelPaginatedRead(items=[ChannelRead(**item) for item in items],
                                total=total)
