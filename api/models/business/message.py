import time
from typing import List

from pydantic import Field

from models.business.channel import ChannelRead
from models.business.tag import TagRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class MessageBase(PyBaseModel):
    title: str = Field(...)
    description: str = Field(...)
    channel_id: PyObjectId = Field(...)
    tag_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class MessageRead(MessageBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    channel: ChannelRead = Field(...)
    tags: List[TagRead] = Field(...)


class MessageCreate(MessageBase):
    pass


class MessageUpdate(MessageBase):
    pass


class MessagePaginatedRead(PyBaseModel):
    total: int
    items: List[MessageRead]


class MessageSearch(PyPaginatedBaseModel):
    pass
