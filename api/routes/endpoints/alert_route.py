import time

from fastapi import APIRouter, Depends, Body

import query.alert_route as alert_route_query
import query.tag as tag_query
import query.channel as channel_query
import query.user as user_query
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


@router.put("/{entity_id}/assign/tag/{tag_id}",
            response_model=AlertRouteRead,
            response_model_by_alias=False)
async def assign_to_tag(entity_id: PyObjectId, tag_id: PyObjectId):
    await tag_query.add_alert_route_id_to_tag(tag_id, entity_id)
    updated = await alert_route_query.add_tag_id_to_alert_route(entity_id, tag_id)
    return updated


@router.put("/{entity_id}/assign/channel/{channel_id}",
            response_model=AlertRouteRead,
            response_model_by_alias=False)
async def assign_to_channel(entity_id: PyObjectId, channel_id: PyObjectId):
    await channel_query.add_alert_route_id_to_channel(channel_id, entity_id)
    updated = await alert_route_query.add_channel_id_to_alert_route(entity_id, channel_id)
    return updated


@router.put("/{entity_id}/assign/user/{user_id}",
            response_model=AlertRouteRead,
            response_model_by_alias=False)
async def assign_to_user(entity_id: PyObjectId, user_id: PyObjectId):
    await user_query.add_alert_route_id_to_user(user_id, entity_id)
    updated = await alert_route_query.add_user_id_to_alert_route(entity_id, user_id)
    return updated


@router.put("/{entity_id}/unassign/tag/{tag_id}",
            response_model=AlertRouteRead,
            response_model_by_alias=False)
async def unassign_from_tag(entity_id: PyObjectId, tag_id: PyObjectId):
    await tag_query.remove_alert_route_id_from_tag(tag_id, entity_id)
    updated = await alert_route_query.remove_tag_id_from_alert_route(entity_id, tag_id)
    return updated


@router.put("/{entity_id}/unassign/channel/{channel_id}",
            response_model=AlertRouteRead,
            response_model_by_alias=False)
async def unassign_from_channel(entity_id: PyObjectId, channel_id: PyObjectId):
    await channel_query.remove_alert_route_id_from_channel(channel_id, entity_id)
    updated = await alert_route_query.remove_channel_id_from_alert_route(entity_id, channel_id)
    return updated


@router.put("/{entity_id}/unassign/user/{user_id}",
            response_model=AlertRouteRead,
            response_model_by_alias=False)
async def unassign_from_user(entity_id: PyObjectId, user_id: PyObjectId):
    await user_query.remove_alert_route_id_from_user(user_id, entity_id)
    updated = await alert_route_query.remove_user_id_from_alert_route(entity_id, user_id)
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
