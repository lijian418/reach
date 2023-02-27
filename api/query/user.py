import pymongo

from core.db import user_collection
from models.business.user import UserCreate, UserRead, UserSearch, UserPaginatedRead
from models.fastapi.mongodb import PyObjectId


async def create(payload: UserCreate) -> UserRead:
    new_entity = await user_collection.insert_one(payload.dict())
    created_entity = await user_collection.find_one({"_id": new_entity.inserted_id})
    return UserRead(**created_entity)


async def get(entity_id: PyObjectId) -> UserRead:
    entity = await user_collection.find_one({"_id": entity_id})
    return UserRead(**entity)


async def get_by_username(username: str) -> UserRead:
    entity = await user_collection.find_one({"username": username})
    return UserRead(**entity)


async def update(entity_id: PyObjectId, payload) -> UserRead:
    await user_collection.update_one({"_id": entity_id}, {"$set": payload})
    updated_entity = await user_collection.find_one({"_id": entity_id})
    return UserRead(**updated_entity)


async def delete(entity_id: PyObjectId) -> bool:
    result = await user_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: UserSearch) -> UserPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await user_collection.aggregate(pipeline).to_list(length=None)
    total = await user_collection.count_documents(query)

    return UserPaginatedRead(items=[UserRead(**item) for item in items],
                             total=total)
