import pymongo

from core.db import alert_rule_collection
from models.business.alert_rule import AlertRuleCreate, AlertRuleRead, AlertRuleSearch, AlertRulePaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: AlertRuleCreate) -> AlertRuleRead:
    new_entity = await alert_rule_collection.insert_one(payload.dict())
    created_entity = await alert_rule_collection.find_one({"_id": new_entity.inserted_id})
    return AlertRuleRead(**created_entity)


async def get(entity_id: PyObjectId) -> AlertRuleRead:
    pipeline = [{"$match": {"_id": entity_id}},
                {
                    "$lookup": {
                        "from": "alarm_collection",
                        "localField": "alarm_ids",
                        "foreignField": "_id",
                        "as": "alarms"
                    }
                }]
    entity = await alert_rule_collection.aggregate(pipeline).to_list(length=None)
    return AlertRuleRead(**entity[0])


async def update(entity_id: PyObjectId, payload) -> AlertRuleRead:
    await alert_rule_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await get(entity_id)
    return updated_entity


async def delete(entity_id: PyObjectId) -> bool:
    result = await alert_rule_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: AlertRuleSearch) -> AlertRulePaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {
                    "$lookup": {
                        "from": "alarm_collection",
                        "localField": "alarm_ids",
                        "foreignField": "_id",
                        "as": "alarms"
                    }
                },
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await alert_rule_collection.aggregate(pipeline).to_list(length=None)
    total = await alert_rule_collection.count_documents(query)

    return AlertRulePaginatedRead(items=[AlertRuleRead(**item) for item in items],
                                  total=total)


async def add_alarm_id_to_alert_rule(alert_rule_id: PyObjectId, alarm_id: PyObjectId):
    await alert_rule_collection.update_one({"_id": alert_rule_id}, {"$addToSet": {"alarm_ids": alarm_id}})
    updated = await get(alert_rule_id)
    return updated


async def remove_alarm_id_from_alert_rule(alert_rule_id: PyObjectId, alarm_id: PyObjectId):
    await alert_rule_collection.update_one({"_id": alert_rule_id}, {"$pull": {"alarm_ids": alarm_id}})
    updated = await get(alert_rule_id)
    return updated
