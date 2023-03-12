import pymongo

from core.db import destination_collection
from models.business.destination import DestinationCreate, DestinationRead, DestinationSearch, \
    DestinationPaginatedRead
from models.fastapi.mongodb import PyObjectId
from query.lookups import alert_rules_lookup


async def create(payload: DestinationCreate) -> DestinationRead:
    new_entity = await destination_collection.insert_one(payload.dict())
    return await get(new_entity.inserted_id)


async def get(entity_id: PyObjectId) -> DestinationRead:
    pipeline = [{"$match": {"_id": entity_id}},
                alert_rules_lookup]
    entity = await destination_collection.aggregate(pipeline).to_list(length=None)
    return DestinationRead(**entity[0])


async def update(entity_id: PyObjectId, payload) -> DestinationRead:
    await destination_collection.update_one({"_id": entity_id}, {"$set": payload})
    return await get(entity_id)


async def remove_alert_rule(entity_id: PyObjectId, alert_rule_id: PyObjectId) -> DestinationRead:
    await destination_collection.update_one({"_id": entity_id}, {"$pull": {"alert_rule_ids": alert_rule_id}})
    return await get(entity_id)


async def delete(entity_id: PyObjectId) -> bool:
    result = await destination_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: DestinationSearch) -> DestinationPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                alert_rules_lookup,
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await destination_collection.aggregate(pipeline).to_list(length=None)
    total = await destination_collection.count_documents(query)

    return DestinationPaginatedRead(items=[DestinationRead(**item) for item in items],
                                    total=total)
