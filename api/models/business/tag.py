import time
from typing import List

from pydantic import Field

from models.business.alert_route import AlertRouteRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class TagBase(PyBaseModel):
    channel_id: PyObjectId = Field(...)
    slug: str = Field(...)
    alert_route_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class TagRead(TagBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alert_routes: List[AlertRouteRead] = Field([])


class TagCreate(TagBase):
    pass


class TagUpdate(TagBase):
    pass


class TagPaginatedRead(PyBaseModel):
    total: int
    items: List[TagRead]


class TagSearch(PyPaginatedBaseModel):
    channel_id: PyObjectId
