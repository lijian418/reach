import time

from fastapi import APIRouter, Depends, Body

import query.user as user_query
import query.subscription as subscription_query
import query.channel as channel_query
import query.alert_rule as alert_rule_query
import query.destination as destination_query
from models.business.user import UserRead, UserCreate, UserPaginatedRead, UserSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=UserRead,
             response_model_by_alias=False)
async def create(payload: UserCreate = Body(...)):
    created = await user_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=UserRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await user_query.update(entity_id, payload)
    return updated


@router.get("/username/{username}",
            response_model=UserRead,
            response_model_by_alias=False)
async def get_by_username(username: str):
    return await user_query.get_by_username(username)


@router.get("/{entity_id}",
            response_model=UserRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await user_query.get(entity_id)


@router.get("",
            response_model=UserPaginatedRead,
            response_model_by_alias=False)
async def find(search: UserSearch = Depends()):
    found = await user_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=UserRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    entity = await user_query.get(entity_id)

    # delete all subscriptions
    for subscription in entity.subscriptions:
        alert_rule = await alert_rule_query.get(subscription.alert_rule_id)
        if alert_rule.destination_ids is not None and len(alert_rule.destination_ids) > 0:
            for destination_id in alert_rule.destination_ids:
                await destination_query.remove_alert_rule(destination_id, entity_id)

        await channel_query.remove_alert_rule(alert_rule.channel_id, entity_id)
        await user_query.remove_subscription(subscription.user_id, entity_id)
        await alert_rule_query.delete(subscription.alert_rule_id)
        await subscription_query.delete(entity_id)

    deleted = await user_query.delete(entity_id)
    return deleted
