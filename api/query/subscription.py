import pymongo

from core.db import subscription_collection
from models.business.subscription import SubscriptionCreate, SubscriptionRead, SubscriptionSearch, \
    SubscriptionPaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: SubscriptionCreate) -> SubscriptionRead:
    new_entity = await subscription_collection.insert_one(payload.dict())
    created_entity = await subscription_collection.find_one({"_id": new_entity.inserted_id})
    return SubscriptionRead(**created_entity)


async def get(entity_id: PyObjectId) -> SubscriptionRead:
    entity = await subscription_collection.find_one({"_id": entity_id})
    return SubscriptionRead(**entity)


async def update(entity_id: PyObjectId, payload) -> SubscriptionRead:
    await subscription_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await subscription_collection.find_one({"_id": entity_id})
    return SubscriptionRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await subscription_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: SubscriptionSearch) -> SubscriptionPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await subscription_collection.aggregate(pipeline).to_list(length=None)
    total = await subscription_collection.count_documents(query)

    return SubscriptionPaginatedRead(items=[SubscriptionRead(**item) for item in items],
                                     total=total)
