import time
from typing import List, Optional
from pydantic import Field

from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class SubscriptionBase(PyBaseModel):
    channel_id: str = Field(...)
    user_id: PyObjectId = Field(...)
    alert_rule_id: Optional[PyObjectId] = Field(...)
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class SubscriptionRead(SubscriptionBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user: dict = Field(...)
    alert_rule: dict = Field(...)
    channel: dict = Field(...)


class SubscriptionCreate(SubscriptionBase):
    alert_rule: dict = Field(...)


class SubscriptionUpdate(SubscriptionBase):
    pass


class SubscriptionPaginatedRead(PyBaseModel):
    total: int
    items: List[SubscriptionRead]


class SubscriptionSearch(PyPaginatedBaseModel):
    pass
