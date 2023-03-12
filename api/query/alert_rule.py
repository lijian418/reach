import pymongo

from core.db import alert_rule_collection
from models.business.alert_rule import AlertRuleCreate, AlertRuleRead, AlertRuleSearch, AlertRulePaginatedRead
from models.fastapi.mongodb import PyObjectId
from query.lookups import user_lookup, destinations_lookup, user_unwind, channel_lookup, channel_unwind


async def create(payload: AlertRuleCreate) -> AlertRuleRead:
    new_entity = await alert_rule_collection.insert_one(payload.dict())
    return await get(new_entity.inserted_id)


async def get(entity_id: PyObjectId) -> AlertRuleRead:
    pipeline = [{"$match": {"_id": entity_id}},
                channel_lookup,
                destinations_lookup,
                user_lookup,
                user_unwind,
                channel_unwind]
    entity = await alert_rule_collection.aggregate(pipeline).to_list(length=None)
    return AlertRuleRead(**entity[0])


async def remove_destination(alert_rule_id: PyObjectId, destination_id: PyObjectId) -> AlertRuleRead:
    await alert_rule_collection.update_one({"_id": alert_rule_id}, {"$pull": {"destination_ids": destination_id}})
    return await get(alert_rule_id)


async def update(entity_id: PyObjectId, payload) -> AlertRuleRead:
    await alert_rule_collection.update_one({"_id": entity_id}, {"$set": payload})
    return await get(entity_id)


async def delete(entity_id: PyObjectId) -> bool:
    result = await alert_rule_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: AlertRuleSearch) -> AlertRulePaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                channel_lookup,
                destinations_lookup,
                user_lookup,
                user_unwind,
                channel_unwind,
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await alert_rule_collection.aggregate(pipeline).to_list(length=None)
    total = await alert_rule_collection.count_documents(query)

    return AlertRulePaginatedRead(items=[AlertRuleRead(**item) for item in items],
                                  total=total)
