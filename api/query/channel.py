import pymongo

from core.db import channel_collection
from models.business.channel import ChannelCreate, ChannelRead, ChannelSearch, ChannelPaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: ChannelCreate) -> ChannelRead:
    new_entity = await channel_collection.insert_one(payload.dict())
    created_entity = await channel_collection.find_one({"_id": new_entity.inserted_id})
    return ChannelRead(**created_entity)


async def get(entity_id: PyObjectId) -> ChannelRead:
    pipeline = [{"$match": {"_id": entity_id}},
                {
                    "$lookup": {
                        "from": "alarm_collection",
                        "let": {"alarm_ids": "$alarm_ids"},
                        "pipeline": [
                            {"$match": {"$expr": {"$in": ["$_id", "$$alarm_ids"]}}},
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
                        ],
                        "as": "alarms"
                    }
                }]
    entity = await channel_collection.aggregate(pipeline).to_list(length=None)
    return ChannelRead(**entity[0])


async def update(entity_id: PyObjectId, payload) -> ChannelRead:
    await channel_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await get(entity_id)
    return updated_entity


async def add_alarm_id_to_channel(entity_id: PyObjectId, alarm_id: PyObjectId) -> ChannelRead:
    await channel_collection.update_one({"_id": entity_id}, {"$addToSet": {"alarm_ids": alarm_id}})
    updated_entity = await get(entity_id)
    return updated_entity


async def remove_alarm_id_from_channel(entity_id: PyObjectId, alarm_id: PyObjectId) -> ChannelRead:
    await channel_collection.update_one({"_id": entity_id}, {"$pull": {"alarm_ids": alarm_id}})
    updated_entity = await get(entity_id)
    return updated_entity


async def delete(entity_id: PyObjectId) -> bool:
    result = await channel_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: ChannelSearch) -> ChannelPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {
                    "$lookup": {
                        "from": "alarm_collection",
                        "let": {"alarm_ids": "$alarm_ids"},
                        "pipeline": [
                            {"$match": {"$expr": {"$in": ["$_id", "$$alarm_ids"]}}},
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
                        ],
                        "as": "alarms"
                    }
                },
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await channel_collection.aggregate(pipeline).to_list(length=None)
    total = await channel_collection.count_documents(query)

    return ChannelPaginatedRead(items=[ChannelRead(**item) for item in items],
                                total=total)
