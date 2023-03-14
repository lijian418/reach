import time
from typing import List, Optional

from pydantic import Field

from models.business.alert_rule import AlertRuleRead
from models.business.subscription import SubscriptionRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class ChannelBase(PyBaseModel):
    slug: str = Field(...)
    label: str = Field(...)
    description: Optional[str] = Field(None)
    alert_rule_ids: List[PyObjectId] = Field([])
    subscription_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class ChannelRead(ChannelBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class ChannelCreate(ChannelBase):
    pass


class ChannelUpdate(ChannelBase):
    pass


class ChannelPaginatedRead(PyBaseModel):
    total: int
    items: List[ChannelRead]


class ChannelSearch(PyPaginatedBaseModel):
    exclude_subscribed_user_id: PyObjectId = Field(None)
