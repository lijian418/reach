import time
from typing import List

from pydantic import Field

from models.business.channel import ChannelRead
from models.business.tag import TagRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class SubscriptionBase(PyBaseModel):
    user_id: PyObjectId = Field(...)
    channel_id: PyObjectId = Field(...)
    tag_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class SubscriptionRead(SubscriptionBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    channel: ChannelRead = Field(...)
    tag: TagRead = Field(...)


class SubscriptionCreate(SubscriptionBase):
    pass


class SubscriptionUpdate(SubscriptionBase):
    pass


class SubscriptionPaginatedRead(PyBaseModel):
    total: int
    items: List[SubscriptionRead]


class SubscriptionSearch(PyPaginatedBaseModel):
    pass
