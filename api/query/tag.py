import pymongo

from core.db import tag_collection
from models.business.tag import TagCreate, TagRead, TagPaginatedRead, TagSearch
from models.fastapi.mongodb import PyObjectId


async def create(payload: TagCreate) -> TagRead:
    new_entity = await tag_collection.insert_one(payload.dict())
    created_entity = await tag_collection.find_one({"_id": new_entity.inserted_id})
    return TagRead(**created_entity)


async def get(entity_id: PyObjectId) -> TagRead:
    entity = await tag_collection.find_one({"_id": entity_id})
    return TagRead(**entity)


async def update(entity_id: PyObjectId, payload) -> TagRead:
    await tag_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await tag_collection.find_one({"_id": entity_id})
    return TagRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await tag_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: TagSearch) -> TagPaginatedRead:
    query = {"channel_id": search.channel_id}
    pipeline = [{"$match": query},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await tag_collection.aggregate(pipeline).to_list(length=None)
    total = await tag_collection.count_documents(query)

    return TagPaginatedRead(items=[TagRead(**item) for item in items],
                            total=total)


async def add_alert_route_id_to_tag(tag_id: PyObjectId, alert_route_id: PyObjectId):
    await tag_collection.update_one({"_id": tag_id}, {"$addToSet": {"alert_route_ids": alert_route_id}})
    updated_entity = await tag_collection.find_one({"_id": tag_id})
    return TagRead(**updated_entity)


async def remove_alert_route_id_from_tag(tag_id: PyObjectId, alert_route_id: PyObjectId):
    await tag_collection.update_one({"_id": tag_id}, {"$pull": {"alert_route_ids": alert_route_id}})
    updated_entity = await tag_collection.find_one({"_id": tag_id})
    return TagRead(**updated_entity)
