import time

from fastapi import Depends, Body, APIRouter

import query.alarm as alarm_query
import query.channel as channel_query
from models.business.alarm import AlarmRead, AlarmCreate, AlarmPaginatedRead, AlarmSearch
from models.fastapi.mongodb import PyObjectId


router = APIRouter()


@router.post("",
             response_model=AlarmRead,
             response_model_by_alias=False)
async def create(payload: AlarmCreate = Body(...)):
    created = await alarm_query.create(payload)
    await channel_query.add_alarm_id_to_channel(created.channel_id, created.id)
    return created


@router.put("/{entity_id}",
            response_model=AlarmRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await alarm_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=AlarmRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await alarm_query.get(entity_id)


@router.get("",
            response_model=AlarmPaginatedRead,
            response_model_by_alias=False)
async def find(search: AlarmSearch = Depends()):
    found = await alarm_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=AlarmRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    entity = await alarm_query.get(entity_id)
    await alarm_query.delete(entity_id)
    await channel_query.remove_alarm_id_from_channel(entity.channel_id, entity_id)
    return entity
