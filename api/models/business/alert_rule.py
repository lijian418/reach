import time
from typing import List

from pydantic import Field, BaseModel

from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class Rule(BaseModel):
    key: str
    value: str
    operator: str
    type: str


class AlertRuleBase(PyBaseModel):
    label: str = Field(...)
    rules: List[Rule] = Field([])
    logic: str = Field(...)
    levels: List[str] = Field([])
    alarm_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertRuleRead(AlertRuleBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alarms: List[dict] = Field([])


class AlertRuleCreate(AlertRuleBase):
    pass


class AlertRuleUpdate(AlertRuleBase):
    pass


class AlertRulePaginatedRead(PyBaseModel):
    total: int
    items: List[AlertRuleRead]


class AlertRuleSearch(PyPaginatedBaseModel):
    pass
