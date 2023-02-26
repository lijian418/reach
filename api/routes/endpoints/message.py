import time

from fastapi import APIRouter, Depends, Body

import query.message as message_query
from models.business.message import MessageCreate, MessageRead, MessagePaginatedRead, MessageSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=MessageRead,
             response_model_by_alias=False)
async def create(payload: MessageCreate = Body(...)):
    created = await message_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=MessageRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await message_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=MessageRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await message_query.get(entity_id)


@router.get("",
            response_model=MessagePaginatedRead,
            response_model_by_alias=False)
async def find(search: MessageSearch = Depends()):
    found = await message_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=MessageRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    deleted = await message_query.delete(entity_id)
    return deleted
