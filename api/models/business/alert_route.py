import time
from typing import List, Optional

from pydantic import Field

from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class AlertRouteBase(PyBaseModel):
    label: str = Field(...)
    channel_ids: List[PyObjectId] = Field([])
    tag_ids: List[PyObjectId] = Field([])
    user_ids: List[PyObjectId] = Field([])
    webhook_url: Optional[str] = Field(None)
    email: Optional[str] = Field(None)
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertRouteRead(AlertRouteBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class AlertRouteCreate(AlertRouteBase):
    pass


class AlertRouteUpdate(AlertRouteBase):
    pass


class AlertRoutePaginatedRead(PyBaseModel):
    total: int
    items: List[AlertRouteRead]


class AlertRouteSearch(PyPaginatedBaseModel):
    pass
