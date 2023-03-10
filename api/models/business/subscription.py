import time
from typing import List

from fastapi import Query
from pydantic import Field

from models.business.channel import ChannelRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class SubscriptionBase(PyBaseModel):
    channel_id: PyObjectId = Field(...)
    user_id: PyObjectId = Field(...)
    listen_to_all: bool = Field(...)
    alert_rule_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class SubscriptionRead(SubscriptionBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    channel: ChannelRead = Field(...)


class SubscriptionCreate(SubscriptionBase):
    pass


class SubscriptionUpdate(SubscriptionBase):
    pass


class SubscriptionSearchIds(PyPaginatedBaseModel):
    ids: List[PyObjectId] = Field(Query([]))
