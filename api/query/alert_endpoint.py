import pymongo

from core.db import alert_endpoint_collection
from models.business.alert_endpoint import AlertEndpointCreate, AlertEndpointRead, AlertEndpointSearch, \
    AlertEndpointPaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: AlertEndpointCreate) -> AlertEndpointRead:
    new_entity = await alert_endpoint_collection.insert_one(payload.dict())
    created_entity = await alert_endpoint_collection.find_one({"_id": new_entity.inserted_id})
    return AlertEndpointRead(**created_entity)


async def get(entity_id: PyObjectId) -> AlertEndpointRead:
    pipeline = [{"$match": {"_id": entity_id}},
                {
                    "$lookup": {
                        "from": "alarm_collection",
                        "localField": "alarm_ids",
                        "foreignField": "_id",
                        "as": "alarms"
                    }
                },
                {
                    "$lookup": {
                        "from": "user_collection",
                        "localField": "user_ids",
                        "foreignField": "_id",
                        "as": "users"
                    }
                }]
    entity = await alert_endpoint_collection.aggregate(pipeline).to_list(length=None)
    return AlertEndpointRead(**entity[0])



async def update(entity_id: PyObjectId, payload) -> AlertEndpointRead:
    await alert_endpoint_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await alert_endpoint_collection.find_one({"_id": entity_id})
    return AlertEndpointRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await alert_endpoint_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: AlertEndpointSearch) -> AlertEndpointPaginatedRead:
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
                {
                    "$lookup": {
                        "from": "user_collection",
                        "localField": "user_ids",
                        "foreignField": "_id",
                        "as": "users"
                    }
                },
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await alert_endpoint_collection.aggregate(pipeline).to_list(length=None)
    total = await alert_endpoint_collection.count_documents(query)

    return AlertEndpointPaginatedRead(items=[AlertEndpointRead(**item) for item in items],
                                      total=total)


async def add_alarm_id_to_alert_endpoint(endpoint_id: PyObjectId, alarm_id: PyObjectId):
    await alert_endpoint_collection.update_one({"_id": endpoint_id}, {"$addToSet": {"alarm_ids": alarm_id}})
    updated = await alert_endpoint_collection.find_one({"_id": endpoint_id})
    return AlertEndpointRead(**updated)


async def remove_alarm_id_from_alert_endpoint(endpoint_id: PyObjectId, alarm_id: PyObjectId):
    await alert_endpoint_collection.update_one({"_id": endpoint_id}, {"$pull": {"alarm_ids": alarm_id}})
    updated = await alert_endpoint_collection.find_one({"_id": endpoint_id})
    return AlertEndpointRead(**updated)
