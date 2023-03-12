import time

from fastapi import Depends, Body, APIRouter, HTTPException

import query.alert_rule as alert_rule_query
import query.destination as destination_query
import query.channel as channel_query
from models.business.alert_rule import AlertRuleRead, AlertRuleCreate, AlertRulePaginatedRead, \
    AlertRuleSearch
from models.fastapi.mongodb import PyObjectId


router = APIRouter()


@router.post("",
             response_model=AlertRuleRead,
             response_model_by_alias=False)
async def create(payload: AlertRuleCreate = Body(...)):
    created = await alert_rule_query.create(payload)
    await channel_query.add_alert_rule(created.channel_id, created.id)
    return created


@router.put("/{entity_id}",
            response_model=AlertRuleRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await alert_rule_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=AlertRuleRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await alert_rule_query.get(entity_id)


@router.get("",
            response_model=AlertRulePaginatedRead,
            response_model_by_alias=False)
async def find(search: AlertRuleSearch = Depends()):
    found = await alert_rule_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=bool,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    entity = await alert_rule_query.get(entity_id)

    # Do not allow deletion of alert rules that are associated with a user
    # Users will be shown subscriptions, not alert rules directly
    if entity.user_id is not None:
        raise HTTPException(status_code=400,
                            detail="Alert rule is associated with a user "
                                   "and can only be deleted by removing the subscription")

    # Remove FKs from destinations and channels
    if entity.destination_ids is not None and len(entity.destination_ids) > 0:
        for destination_id in entity.destination_ids:
            await destination_query.remove_alert_rule(destination_id, entity_id)

    await channel_query.remove_alert_rule(entity.channel_id, entity_id)
    deleted = await alert_rule_query.delete(entity_id)
    return deleted
