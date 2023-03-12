import time

from fastapi import Depends, Body, APIRouter

import query.destination as destination_query
import query.alert_rule as alert_rule_query
from models.business.destination import DestinationRead, DestinationCreate, DestinationPaginatedRead, DestinationSearch
from models.fastapi.mongodb import PyObjectId


router = APIRouter()


@router.post("",
             response_model=DestinationRead,
             response_model_by_alias=False)
async def create(payload: DestinationCreate = Body(...)):
    created = await destination_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=DestinationRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await destination_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=DestinationRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await destination_query.get(entity_id)


@router.get("",
            response_model=DestinationPaginatedRead,
            response_model_by_alias=False)
async def find(search: DestinationSearch = Depends()):
    found = await destination_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=bool,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    entity = await destination_query.get(entity_id)

    # Remove destination from all alert_rules
    for alert_rule_id in entity.alert_rule_ids:
        await alert_rule_query.remove_destination(alert_rule_id, entity_id)

    deleted = await destination_query.delete(entity_id)
    return deleted
