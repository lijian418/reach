import time
from typing import List

from pydantic import Field

from app.models.base.base_models import PyBaseModel
from app.models.base.mongodb import PyObjectId
from app.models.business.alarm import AlarmRead


class ChannelBase(PyBaseModel):
    slug: str = Field(...)
    label: str = Field(...)
    alarm_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class ChannelRead(ChannelBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alarms: List[AlarmRead] = Field([])
