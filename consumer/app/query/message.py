from app.core.db import message_collection
from app.models.business.message import MessageRead, MessageCreate
from app.models.base.mongodb import PyObjectId


async def create(payload: MessageCreate) -> MessageRead:
    new_entity = await message_collection.insert_one(payload.dict())
    created_entity = await message_collection.find_one({"_id": new_entity.inserted_id})
    return MessageRead(**created_entity)


async def get(entity_id: PyObjectId) -> MessageRead:
    entity = await message_collection.find_one({"_id": entity_id})
    return MessageRead(**entity)


async def update(entity_id: PyObjectId, payload):
    await message_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await get(entity_id)
    return updated_entity
