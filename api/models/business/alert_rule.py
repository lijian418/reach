import time
from typing import List, Optional

from pydantic import Field, BaseModel

from models.business.destination import DestinationRead
from models.business.user import UserRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class Rule(BaseModel):
    key: str
    value: str
    operator: str
    type: str


class AlertRuleBase(PyBaseModel):
    type: str = Field("channel")

    label: str = Field(...)
    rules: List[Rule] = Field([])
    logic: str = Field(...)
    levels: List[str] = Field([])
    priorities: List[str] = Field([])
    destination_ids: List[PyObjectId] = Field([])

    channel_id: PyObjectId = Field(...)
    user_id: Optional[PyObjectId] = Field(None)

    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertRuleRead(AlertRuleBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    channel: dict = Field(...)
    destinations: List[DestinationRead] = Field([])
    user: Optional[UserRead] = Field(None)


class AlertRuleCreate(AlertRuleBase):
    pass


class AlertRuleUpdate(AlertRuleBase):
    pass


class AlertRulePaginatedRead(PyBaseModel):
    total: int
    items: List[AlertRuleRead]


class AlertRuleSearch(PyPaginatedBaseModel):
    pass
