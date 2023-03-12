import time

from fastapi import APIRouter, Depends, Body

import query.subscription as subscription_query
import query.user as user_query
import query.alert_rule as alert_rule_query
import query.channel as channel_query
from models.business.subscription import SubscriptionCreate, SubscriptionRead, SubscriptionPaginatedRead, \
    SubscriptionSearch
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
    entity = await subscription_query.get(entity_id)
    alert_rule = await alert_rule_query.get(entity.alert_rule_id)

    # remove alert rule id from channel
    await channel_query.remove_alert_rule(alert_rule.channel_id, entity_id)
    await alert_rule_query.delete(entity.alert_rule_id)
    await user_query.remove_subscription(entity.user_id, entity_id)
    deleted = await subscription_query.delete(entity_id)
    return deleted
