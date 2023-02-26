import time
from typing import List, Optional

from pydantic import Field

from models.business.alert_route import AlertRouteRead
from models.business.subscription import SubscriptionRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class UserBase(PyBaseModel):
    username: str = Field(...)
    subscription_ids: List[PyObjectId] = Field([])
    alert_route_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class UserRead(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    subscriptions: List[SubscriptionRead] = Field([])
    alert_routes: List[AlertRouteRead] = Field([])


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


class UserPaginatedRead(PyBaseModel):
    total: int
    items: List[UserRead]


class UserSearch(PyPaginatedBaseModel):
    pass
