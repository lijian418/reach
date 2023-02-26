import time

from fastapi import APIRouter, Depends, Body

import query.channel as channel_query
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
    deleted = await channel_query.delete(entity_id)
    return deleted
