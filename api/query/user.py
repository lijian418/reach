import pymongo

from core.db import user_collection
from models.business.user import UserCreate, UserRead, UserSearch, UserPaginatedRead
from models.fastapi.mongodb import PyObjectId
from query.lookups import subscriptions_lookup


async def create(payload: UserCreate) -> UserRead:
    new_entity = await user_collection.insert_one(payload.dict())
    return await get(new_entity.inserted_id)


async def get(entity_id: PyObjectId) -> UserRead:
    pipeline = [{"$match": {"_id": entity_id}},
                subscriptions_lookup]
    entity = await user_collection.aggregate(pipeline).to_list(length=None)
    return UserRead(**entity[0])


async def get_by_username(username: str) -> UserRead:
    entity = await user_collection.find_one({"username": username})
    return await get(entity["_id"])


async def update(entity_id: PyObjectId, payload) -> UserRead:
    await user_collection.update_one({"_id": entity_id}, {"$set": payload})
    return await get(entity_id)


async def remove_subscription(user_id: PyObjectId, subscription_id: PyObjectId) -> UserRead:
    await user_collection.update_one({"_id": user_id}, {"$pull": {"subscription_ids": subscription_id}})
    return await get(user_id)


async def delete(entity_id: PyObjectId) -> bool:
    result = await user_collection.delete_one({"_id": entity_id})
    return result.deleted_count == 1


async def find(search: UserSearch) -> UserPaginatedRead:
    query = {}
    pipeline = [{"$match": query},
                subscriptions_lookup,
                {"$sort": {"created_at": pymongo.DESCENDING}},
                {"$skip": search.skip},
                {"$limit": search.limit}]

    items = await user_collection.aggregate(pipeline).to_list(length=None)
    total = await user_collection.count_documents(query)

    return UserPaginatedRead(items=[UserRead(**item) for item in items],
                             total=total)

