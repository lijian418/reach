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
                {"$lookup": {
                    "from": "tag_collection",
                    "localField": "tag_ids",
                    "foreignField": "_id",
                    "as": "tags"
                }}]
    entity = await channel_collection.aggregate(pipeline).to_list(length=None)
    return ChannelRead(**entity[0])


async def update(entity_id: PyObjectId, payload) -> ChannelRead:
    await channel_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await channel_collection.find_one({"_id": entity_id})
    return ChannelRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await channel_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: ChannelSearch) -> ChannelPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {"$lookup": {
                    "from": "tag_collection",
                    "localField": "tag_ids",
                    "foreignField": "_id",
                    "as": "tags"
                }},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await channel_collection.aggregate(pipeline).to_list(length=None)
    total = await channel_collection.count_documents(query)

    return ChannelPaginatedRead(items=[ChannelRead(**item) for item in items],
                                total=total)


async def add_tag_to_channel(channel_id: PyObjectId, tag_id: PyObjectId):
    await channel_collection.update_one({"_id": channel_id}, {"$addToSet": {"tag_ids": tag_id}})
    updated_entity = await channel_collection.find_one({"_id": channel_id})
    return ChannelRead(**updated_entity)


async def add_alert_route_id_to_channel(channel_id: PyObjectId, alert_route_id: PyObjectId):
    await channel_collection.update_one({"_id": channel_id}, {"$addToSet": {"alert_route_ids": alert_route_id}})
    updated_entity = await channel_collection.find_one({"_id": channel_id})
    return ChannelRead(**updated_entity)


async def remove_alert_route_id_from_channel(channel_id: PyObjectId, alert_route_id: PyObjectId):
    await channel_collection.update_one({"_id": channel_id}, {"$pull": {"alert_route_ids": alert_route_id}})
    updated_entity = await channel_collection.find_one({"_id": channel_id})
    return ChannelRead(**updated_entity)
