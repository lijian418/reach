import time

from fastapi import APIRouter, Depends, Body

import query.user as user_query
from models.business.user import UserRead, UserCreate, UserPaginatedRead, UserSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=UserRead,
             response_model_by_alias=False)
async def create(payload: UserCreate = Body(...)):
    created = await user_query.create(payload)
    return created


@router.put("/{entity_id}",
            response_model=UserRead,
            response_model_by_alias=False)
async def update(entity_id: PyObjectId, payload=Body(...)):
    payload['updated_at'] = time.time()
    updated = await user_query.update(entity_id, payload)
    return updated


@router.get("/{entity_id}",
            response_model=UserRead,
            response_model_by_alias=False)
async def get(entity_id: PyObjectId):
    return await user_query.get(entity_id)


@router.get("",
            response_model=UserPaginatedRead,
            response_model_by_alias=False)
async def find(search: UserSearch = Depends()):
    found = await user_query.find(search)
    return found


@router.delete("/{entity_id}",
               response_model=UserRead,
               response_model_by_alias=False)
async def delete(entity_id: PyObjectId):
    deleted = await user_query.delete(entity_id)
    return deleted
