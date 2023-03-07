import time

from fastapi import Depends, Body, APIRouter
from starlette.responses import JSONResponse

import query.alert_endpoint as alert_endpoint_query
from models.business.alert_endpoint import AlertEndpointRead, AlertEndpointCreate, AlertEndpointPaginatedRead, \
    AlertEndpointSearch
from models.fastapi.mongodb import PyObjectId


router = APIRouter()


@router.post("",
             response_model=AlertEndpointRead,
             response_model_by_alias=False)
async def create(payload: AlertEndpointCreate = Body(...)):
    created = await alert_endpoint_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=AlertEndpointRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    payload['user_ids'] = [PyObjectId(user_id) for user_id in payload['user_ids']]
    updated = await alert_endpoint_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=AlertEndpointRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await alert_endpoint_query.get(entity_id)


@router.get("",
            response_model=AlertEndpointPaginatedRead,
            response_model_by_alias=False)
async def find(search: AlertEndpointSearch = Depends()):
    found = await alert_endpoint_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=bool,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    entity = await alert_endpoint_query.get(entity_id)
    if len(entity.alarm_ids) > 0:
        return JSONResponse(status_code=400, content={"message": "Endpoint is used by one or more alarms"})
    deleted = await alert_endpoint_query.delete(entity_id)
    return deleted
