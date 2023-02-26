import time

from fastapi import APIRouter, Depends, Body

import query.tag as tag_query
from models.business.tag import TagRead, TagCreate, TagPaginatedRead, TagSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=TagRead,
             response_model_by_alias=False)
async def create(payload: TagCreate = Body(...)):
    created = await tag_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=TagRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await tag_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=TagRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await tag_query.get(entity_id)


@router.get("",
            response_model=TagPaginatedRead,
            response_model_by_alias=False)
async def find(search: TagSearch = Depends()):
    found = await tag_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=TagRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    deleted = await tag_query.delete(entity_id)
    return deleted
