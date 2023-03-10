import time
from typing import List

from fastapi import APIRouter, Body, Depends

import query.subscription as subscription_query
import query.channel as channel_query
from models.business.subscription import SubscriptionCreate, SubscriptionRead, SubscriptionSearchIds
from models.fastapi.mongodb import PyObjectId
import query.user as user_query

router = APIRouter()


@router.post("",
             response_model=SubscriptionRead,
             response_model_by_alias=False)
async def create(payload: SubscriptionCreate = Body(...)):
    created = await subscription_query.create(payload)
    await channel_query.add_subscription_id_to_channel(payload.channel_id, created.id)
    await channel_query.add_subscribed_user_id_to_channel(payload.channel_id, created.user_id)
    await user_query.add_subscription_id_to_user(payload.user_id, created.id)
    return created


@router.put("/{entity_id}",
            response_model=SubscriptionRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await subscription_query.update(entity_id, payload)
    return updated


@router.delete("/{entity_id}",
               response_model=bool,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    entity = await subscription_query.get(entity_id)
    await channel_query.remove_subscription_id_from_channel(entity.channel_id, entity_id)
    await channel_query.remove_subscribed_user_id_from_channel(entity.channel_id, entity.user_id)
    await user_query.remove_subscription_id_from_user(entity.user_id, entity_id)
    deleted = await subscription_query.delete(entity_id)
    return deleted


@router.get("",
            response_model=List[SubscriptionRead],
            response_model_by_alias=False)
async def get_from_list_of_ids(search: SubscriptionSearchIds = Depends()):
    entities = await subscription_query.get_from_list_of_ids(search.ids)
    return entities

