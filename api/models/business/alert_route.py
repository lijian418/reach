import time
from typing import List, Optional

from pydantic import Field

from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class AlertRouteBase(PyBaseModel):
    channel_id: Optional[PyObjectId] = Field(None)
    tag_id: Optional[PyObjectId] = Field(None)
    user_id: Optional[PyObjectId] = Field(None)
    webhook_urls: List[str] = Field([])
    emails: List[str] = Field([])
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
