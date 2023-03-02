import time
from typing import List

from pydantic import Field

from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class AlertRuleBase(PyBaseModel):
    label: str = Field(...)
    rule: str = Field(...)
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertRuleRead(AlertRuleBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class AlertRuleCreate(AlertRuleBase):
    pass


class AlertRuleUpdate(AlertRuleBase):
    pass


class AlertRulePaginatedRead(PyBaseModel):
    total: int
    items: List[AlertRuleRead]


class AlertRuleSearch(PyPaginatedBaseModel):
    pass
