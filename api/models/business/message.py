import time
from typing import List, Optional

from pydantic import Field

from models.business.channel import ChannelRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class MessageBase(PyBaseModel):
    title: str = Field(...)
    description: str = Field(...)
    level: str = Field(...)
    tags: dict = Field(...)
    status: Optional[str] = Field(None)
    triggered_alarms: List[PyObjectId] = Field([])
    channel_id: Optional[PyObjectId] = Field(None)
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class MessageRead(MessageBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class MessageCreate(MessageBase):
    channel_slug: str = Field(...)


class MessageUpdate(MessageBase):
    pass


class MessagePaginatedRead(PyBaseModel):
    total: int
    items: List[MessageRead]


class MessageSearch(PyPaginatedBaseModel):
    pass
