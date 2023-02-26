import time

from fastapi import APIRouter, Depends, Body

import query.subscription as subscription_query
from models.business.subscription import SubscriptionCreate, SubscriptionRead, SubscriptionPaginatedRead, SubscriptionSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=SubscriptionRead,
             response_model_by_alias=False)
async def create(payload: SubscriptionCreate = Body(...)):
    created = await subscription_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=SubscriptionRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await subscription_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=SubscriptionRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await subscription_query.get(entity_id)


@router.get("",
            response_model=SubscriptionPaginatedRead,
            response_model_by_alias=False)
async def find(search: SubscriptionSearch = Depends()):
    found = await subscription_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=SubscriptionRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    deleted = await subscription_query.delete(entity_id)
    return deleted
