import time

from fastapi import APIRouter, Depends, Body

import query.subscription as subscription_query
import query.user as user_query
import query.alert_rule as alert_rule_query
import query.channel as channel_query
from models.business.alert_rule import AlertRuleCreate
from models.business.subscription import SubscriptionCreate, SubscriptionRead, SubscriptionPaginatedRead, \
    SubscriptionSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=SubscriptionRead,
             response_model_by_alias=False)
async def create(payload: SubscriptionCreate = Body(...)):
    payload.alert_rule['type'] = "subscription"
    payload.alert_rule['channel_id'] = payload.channel_id
    payload.alert_rule['user_id'] = payload.user_id
    alert_rule = await alert_rule_query.create(AlertRuleCreate(**payload.alert_rule))

    payload.alert_rule_id = alert_rule.id
    subscription = await subscription_query.create(payload)

    await channel_query.add_alert_rule(payload.channel_id, alert_rule.id)
    await channel_query.add_subscription(payload.channel_id, subscription.id)
    await user_query.add_subscription(payload.user_id, subscription.id)

    return subscription


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

    # remove alert rule
    await channel_query.remove_alert_rule(alert_rule.channel_id, alert_rule.id)
    await alert_rule_query.delete(entity.alert_rule_id)

    # remove subscription
    await channel_query.remove_subscription(alert_rule.channel_id, entity_id)
    await user_query.remove_subscription(entity.user_id, entity_id)
    deleted = await subscription_query.delete(entity_id)
    return deleted
