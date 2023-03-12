import time
from typing import List

from pydantic import Field

from models.business.alert_rule import AlertRuleRead
from models.business.subscription import SubscriptionRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class ChannelBase(PyBaseModel):
    slug: str = Field(...)
    label: str = Field(...)
    alert_rule_ids: List[PyObjectId] = Field([])
    subscription_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class ChannelRead(ChannelBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alert_rules: List[AlertRuleRead] = Field([])
    subscriptions: List[SubscriptionRead] = Field([])


class ChannelCreate(ChannelBase):
    pass


class ChannelUpdate(ChannelBase):
    pass


class ChannelPaginatedRead(PyBaseModel):
    total: int
    items: List[ChannelRead]


class ChannelSearch(PyPaginatedBaseModel):
    exclude_subscribed_user_id: PyObjectId = Field(None)
