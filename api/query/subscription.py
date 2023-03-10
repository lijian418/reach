import pymongo

from core.db import subscription_collection
from models.business.subscription import SubscriptionCreate, SubscriptionRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: SubscriptionCreate) -> SubscriptionRead:
    new_entity = await subscription_collection.insert_one(payload.dict())
    created_entity = await get(new_entity.inserted_id)
    return created_entity


async def get(entity_id: PyObjectId) -> SubscriptionRead:
    entity = await subscription_collection.find_one({"_id": entity_id})
    return SubscriptionRead(**entity)


async def get_from_list_of_ids(entity_ids: list[PyObjectId]) -> list[SubscriptionRead]:
    query = {"_id": {"$in": entity_ids}}
    pipeline = [
        {"$match": query},
        {"$lookup": {
            "from": "channel_collection",
            "localField": "channel_id",
            "foreignField": "_id",
            "as": "channel"
        }},
        {"$unwind": "$channel"},
        {"$sort": {"created_at": pymongo.DESCENDING}},
    ]
    entities = await subscription_collection.aggregate(pipeline).to_list(None)
    return [SubscriptionRead(**entity) for entity in entities]


async def update(entity_id: PyObjectId, payload) -> SubscriptionRead:
    await subscription_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await subscription_collection.find_one({"_id": entity_id})
    return SubscriptionRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await subscription_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1
