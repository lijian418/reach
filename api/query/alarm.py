import pymongo

from core.db import alarm_collection
from models.business.alarm import AlarmCreate, AlarmRead, AlarmSearch, AlarmPaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: AlarmCreate) -> AlarmRead:
    new_entity = await alarm_collection.insert_one(payload.dict())
    created_entity = await get(new_entity.inserted_id)
    return created_entity


async def get(entity_id: PyObjectId) -> AlarmRead:
    query = {"_id": entity_id}
    pipeline = [{"$match": query},
                {"$lookup": {
                    "from": "alert_endpoint_collection",
                    "localField": "endpoint_id",
                    "foreignField": "_id",
                    "as": "endpoint"
                }},
                {"$lookup": {
                    "from": "alert_rule_collection",
                    "localField": "rule_id",
                    "foreignField": "_id",
                    "as": "rule"
                }},
                {"$unwind": "$rule"},
                {"$unwind": "$endpoint"}]
    entity = await alarm_collection.aggregate(pipeline).to_list(length=None)
    return AlarmRead(**entity[0])


async def update(entity_id: PyObjectId, payload) -> AlarmRead:
    await alarm_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await get(entity_id)
    return updated_entity


async def delete(entity_id: PyObjectId) -> bool:
    result = await alarm_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: AlarmSearch) -> AlarmPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {"$lookup": {
                    "from": "alert_endpoint_collection",
                    "localField": "endpoint_id",
                    "foreignField": "_id",
                    "as": "endpoint"
                }},
                {"$lookup": {
                    "from": "alert_rule_collection",
                    "localField": "rule_id",
                    "foreignField": "_id",
                    "as": "rule"
                }},
                {"$unwind": "$rule"},
                {"$unwind": "$endpoint"},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await alarm_collection.aggregate(pipeline).to_list(length=None)
    total = await alarm_collection.count_documents(query)

    return AlarmPaginatedRead(items=[AlarmRead(**item) for item in items],
                              total=total)
