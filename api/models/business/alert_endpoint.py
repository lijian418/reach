import time
from typing import List, Optional

from pydantic import Field

from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class AlertEndpointBase(PyBaseModel):
    label: str = Field(...)
    webhook_url: Optional[str] = Field(None)
    email: Optional[str] = Field(None)
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertEndpointRead(AlertEndpointBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class AlertEndpointCreate(AlertEndpointBase):
    pass


class AlertEndpointUpdate(AlertEndpointBase):
    pass


class AlertEndpointPaginatedRead(PyBaseModel):
    total: int
    items: List[AlertEndpointRead]


class AlertEndpointSearch(PyPaginatedBaseModel):
    pass
