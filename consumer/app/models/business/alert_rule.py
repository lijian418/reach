import time
from typing import List, Optional

from pydantic import Field, BaseModel

from app.models.base.base_models import PyBaseModel
from app.models.base.mongodb import PyObjectId


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
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertRuleRead(AlertRuleBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
