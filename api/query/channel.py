import pymongo

from core.db import channel_collection
from models.business.channel import ChannelCreate, ChannelRead, ChannelSearch, ChannelPaginatedRead
from models.fastapi.mongodb import PyObjectId
from query.lookups import alert_rules_lookup, subscriptions_lookup


async def create(payload: ChannelCreate) -> ChannelRead:
    new_entity = await channel_collection.insert_one(payload.dict())
    return await get(new_entity.inserted_id)


async def get_by_slug(slug: str) -> ChannelRead:
    entity = await channel_collection.find_one({"slug": slug})
    return await get(entity["_id"])


async def get(entity_id: PyObjectId) -> ChannelRead:
    pipeline = [{"$match": {"_id": entity_id}},
                alert_rules_lookup,
                subscriptions_lookup]
    entity = await channel_collection.aggregate(pipeline).to_list(length=None)
    return ChannelRead(**entity[0])


async def update(entity_id: PyObjectId, payload) -> ChannelRead:
    await channel_collection.update_one({"_id": entity_id}, {"$set": payload})
    return await get(entity_id)


async def add_alert_rule(entity_id: PyObjectId, alert_rule_id: PyObjectId) -> ChannelRead:
    await channel_collection.update_one({"_id": entity_id}, {"$push": {"alert_rule_ids": alert_rule_id}})
    return await get(entity_id)


async def remove_alert_rule(entity_id: PyObjectId, alert_rule_id: PyObjectId) -> ChannelRead:
    await channel_collection.update_one({"_id": entity_id}, {"$pull": {"alert_rule_ids": alert_rule_id}})
    return await get(entity_id)


async def delete(entity_id: PyObjectId) -> bool:
    result = await channel_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: ChannelSearch) -> ChannelPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                alert_rules_lookup,
                subscriptions_lookup,
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await channel_collection.aggregate(pipeline).to_list(length=None)
    total = await channel_collection.count_documents(query)

    return ChannelPaginatedRead(items=[ChannelRead(**item) for item in items],
                                total=total)
