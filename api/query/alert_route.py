import pymongo

from core.db import alert_route_collection
from models.business.alert_route import AlertRouteCreate, AlertRouteRead, AlertRouteSearch, AlertRoutePaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: AlertRouteCreate) -> AlertRouteRead:
    new_entity = await alert_route_collection.insert_one(payload.dict())
    created_entity = await alert_route_collection.find_one({"_id": new_entity.inserted_id})
    return AlertRouteRead(**created_entity)


async def get(entity_id: PyObjectId) -> AlertRouteRead:
    entity = await alert_route_collection.find_one({"_id": entity_id})
    return AlertRouteRead(**entity)


async def update(entity_id: PyObjectId, payload) -> AlertRouteRead:
    await alert_route_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await alert_route_collection.find_one({"_id": entity_id})
    return AlertRouteRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await alert_route_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: AlertRouteSearch) -> AlertRoutePaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await alert_route_collection.aggregate(pipeline).to_list(length=None)
    total = await alert_route_collection.count_documents(query)

    return AlertRoutePaginatedRead(items=[AlertRouteRead(**item) for item in items],
                                   total=total)

