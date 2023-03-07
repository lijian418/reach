import time
from typing import List

from pydantic import Field

from models.business.user import UserRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class AlertEndpointBase(PyBaseModel):
    label: str = Field(...)
    webhook_urls: List[str] = Field([])
    emails: List[str] = Field([])
    user_ids: List[PyObjectId] = Field([])
    alarm_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertEndpointRead(AlertEndpointBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alarms: List[dict] = Field([])
    users: List[UserRead] = Field([])


class AlertEndpointCreate(AlertEndpointBase):
    pass


class AlertEndpointUpdate(AlertEndpointBase):
    pass


class AlertEndpointPaginatedRead(PyBaseModel):
    total: int
    items: List[AlertEndpointRead]


class AlertEndpointSearch(PyPaginatedBaseModel):
    pass
