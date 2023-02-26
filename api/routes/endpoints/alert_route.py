import time

from fastapi import APIRouter, Depends, Body

import query.alert_route as alert_route_query
from models.business.alert_route import AlertRouteRead, AlertRouteCreate, AlertRoutePaginatedRead, AlertRouteSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=AlertRouteRead,
             response_model_by_alias=False)
async def create(payload: AlertRouteCreate = Body(...)):
    created = await alert_route_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=AlertRouteRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await alert_route_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=AlertRouteRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await alert_route_query.get(entity_id)


@router.get("",
            response_model=AlertRoutePaginatedRead,
            response_model_by_alias=False)
async def find(search: AlertRouteSearch = Depends()):
    found = await alert_route_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=AlertRouteRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    deleted = await alert_route_query.delete(entity_id)
    return deleted
