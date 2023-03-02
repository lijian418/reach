import time

from fastapi import Depends, Body, APIRouter

import query.alert_rule as alert_rule_query
from models.business.alert_rule import AlertRuleRead, AlertRuleCreate, AlertRulePaginatedRead, \
    AlertRuleSearch
from models.fastapi.mongodb import PyObjectId


router = APIRouter()


@router.post("",
             response_model=AlertRuleRead,
             response_model_by_alias=False)
async def create(payload: AlertRuleCreate = Body(...)):
    created = await alert_rule_query.create(payload)
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
               response_model=AlertRuleRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    deleted = await alert_rule_query.delete(entity_id)
    return deleted
