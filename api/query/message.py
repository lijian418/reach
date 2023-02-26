import pymongo

from core.db import message_collection
from models.business.message import MessageRead, MessageCreate, MessageSearch, MessagePaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: MessageCreate) -> MessageRead:
    new_entity = await message_collection.insert_one(payload.dict())
    created_entity = await message_collection.find_one({"_id": new_entity.inserted_id})
    return MessageRead(**created_entity)


async def get(entity_id: PyObjectId) -> MessageRead:
    entity = await message_collection.find_one({"_id": entity_id})
    return MessageRead(**entity)


async def update(entity_id: PyObjectId, payload) -> MessageRead:
    await message_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await message_collection.find_one({"_id": entity_id})
    return MessageRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await message_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: MessageSearch) -> MessagePaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await message_collection.aggregate(pipeline).to_list(length=None)
    total = await message_collection.count_documents(query)

    return MessagePaginatedRead(items=[MessageRead(**item) for item in items],
                                total=total)
