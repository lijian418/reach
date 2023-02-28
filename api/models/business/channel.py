import time
from typing import List, Optional

from pydantic import Field

from models.business.alert_route import AlertRouteRead
from models.business.tag import TagRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class ChannelBase(PyBaseModel):
    slug: str = Field(...)
    label: str = Field(...)
    tag_ids: List[PyObjectId] = Field([])
    alert_route_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class ChannelRead(ChannelBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    tags: List[TagRead] = Field([])
    alert_routes: List[AlertRouteRead] = Field([])


class ChannelCreate(ChannelBase):
    pass


class ChannelUpdate(ChannelBase):
    pass


class ChannelPaginatedRead(PyBaseModel):
    total: int
    items: List[ChannelRead]


class ChannelSearch(PyPaginatedBaseModel):
    pass
