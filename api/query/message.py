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


async def find(search: MessageSearch) -> MessagePaginatedRead:
    query = {}

    if search.channel_id:
        query["channel_id"] = search.channel_id
    if search.user_id:
        query["triggered_alarms.endpoint.user_ids"] = {"$in": [search.user_id]}

    pipeline = [{"$match": query},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await message_collection.aggregate(pipeline).to_list(length=None)
    total = await message_collection.count_documents(query)

    return MessagePaginatedRead(items=[MessageRead(**item) for item in items],
                                total=total)
