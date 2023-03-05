from fastapi import APIRouter, Depends, Body

import query.message as message_query
import query.channel as channel_query
from core.queue.client import queue_client
from models.business.message import MessageCreate, MessageRead, MessagePaginatedRead, MessageSearch
from models.fastapi.mongodb import PyObjectId

router = APIRouter()


@router.post("",
             response_model=dict,
             response_model_by_alias=False)
async def create(payload: MessageCreate = Body(...)):
    await queue_client.send(str(payload.json()))
    return {"message": "Message sent to queue"}


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

