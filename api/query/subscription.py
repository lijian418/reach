import pymongo

from core.db import subscription_collection
from models.business.subscription import SubscriptionCreate, SubscriptionRead, SubscriptionSearch, \
    SubscriptionPaginatedRead
from models.fastapi.mongodb import PyObjectId
from query.lookups import user_lookup, channel_lookup, alert_rule_lookup, alert_rule_unwind, channel_unwind, user_unwind


async def create(payload: SubscriptionCreate) -> SubscriptionRead:
    new_entity = await subscription_collection.insert_one(payload.dict())
    return await get(new_entity.inserted_id)


async def get(entity_id: PyObjectId) -> SubscriptionRead:
    pipeline = [{"$match": {"_id": entity_id}},
                user_lookup,
                alert_rule_lookup,
                channel_lookup,
                user_unwind,
                alert_rule_unwind,
                channel_unwind]
    entity = await subscription_collection.aggregate(pipeline).to_list(length=None)
    return SubscriptionRead(**entity[0])


async def update(entity_id: PyObjectId, payload) -> SubscriptionRead:
    await subscription_collection.update_one({"_id": entity_id}, {"$set": payload})
    return await get(entity_id)


async def delete(entity_id: PyObjectId) -> bool:
    result = await subscription_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: SubscriptionSearch) -> SubscriptionPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                user_lookup,
                alert_rule_lookup,
                channel_lookup,
                user_unwind,
                alert_rule_unwind,
                channel_unwind,
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await subscription_collection.aggregate(pipeline).to_list(length=None)
    total = await subscription_collection.count_documents(query)

    return SubscriptionPaginatedRead(items=[SubscriptionRead(**item) for item in items],
                                     total=total)
