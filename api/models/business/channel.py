import time
from typing import List

from pydantic import Field

from models.business.alarm import AlarmRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class ChannelBase(PyBaseModel):
    slug: str = Field(...)
    label: str = Field(...)
    alarm_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class ChannelRead(ChannelBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alarms: List[AlarmRead] = Field([])


class ChannelCreate(ChannelBase):
    pass


class ChannelUpdate(ChannelBase):
    pass


class ChannelPaginatedRead(PyBaseModel):
    total: int
    items: List[ChannelRead]


class ChannelSearch(PyPaginatedBaseModel):
    pass
