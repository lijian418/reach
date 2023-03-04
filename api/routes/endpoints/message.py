from fastapi import APIRouter, Depends, Body

import query.message as message_query
import query.channel as channel_query
from core.queue.client import queue_client
from models.business.message import MessageCreate, MessageRead, MessagePaginatedRead, MessageSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=MessageRead,
             response_model_by_alias=False)
async def create(payload: MessageCreate = Body(...)):
    payload.status = "created"
    channel = await channel_query.get_by_slug(payload.channel_slug)
    payload.channel_id = channel['_id']
    created = await message_query.create(payload)
    if created:
        await queue_client.send(str(created.id))
    return created


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

