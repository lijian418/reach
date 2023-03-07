import time
from typing import List, Optional

from pydantic import Field

from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class AlertEndpointBase(PyBaseModel):
    label: str = Field(...)
    webhook_urls: List[str] = Field([])
    alarm_ids: List[PyObjectId] = Field([])
    emails: List[str] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertEndpointRead(AlertEndpointBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alarms: List[dict] = Field([])


class AlertEndpointCreate(AlertEndpointBase):
    pass


class AlertEndpointUpdate(AlertEndpointBase):
    pass


class AlertEndpointPaginatedRead(PyBaseModel):
    total: int
    items: List[AlertEndpointRead]


class AlertEndpointSearch(PyPaginatedBaseModel):
    pass
