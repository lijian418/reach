import time

from fastapi import APIRouter, Depends, Body

import query.channel as channel_query
import query.alarm as alarm_query
import query.alert_rule as alert_rule_query
import query.alert_endpoint as alert_endpoint_query
from models.business.channel import ChannelRead, ChannelCreate, ChannelPaginatedRead, ChannelSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=ChannelRead,
             response_model_by_alias=False)
async def create(payload: ChannelCreate = Body(...)):
    created = await channel_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=ChannelRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    if payload['alert_rule_ids']:
        payload['alert_rule_ids'] = [PyObjectId(id) for id in payload['alert_rule_ids']]
    updated = await channel_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=ChannelRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await channel_query.get(entity_id)


@router.get("",
            response_model=ChannelPaginatedRead,
            response_model_by_alias=False)
async def find(search: ChannelSearch = Depends()):
    found = await channel_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=ChannelRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    entity = await channel_query.get(entity_id)
    for alarm in entity.alarms:
        await alert_endpoint_query.remove_alarm_id_from_alert_endpoint(alarm.endpoint_id, alarm.id)
        await alert_rule_query.remove_alarm_id_from_alert_rule(alarm.rule_id, alarm.id)
        await alarm_query.delete(alarm.id)

    deleted = await channel_query.delete(entity_id)
    return entity
