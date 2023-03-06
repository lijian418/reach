import time
from typing import List

from pydantic import Field

from models.business.alert_endpoint import AlertEndpointRead
from models.business.alert_rule import AlertRuleRead
from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class AlarmBase(PyBaseModel):
    label: str = Field(...)
    endpoint_id: PyObjectId = Field(...)
    rule_id: PyObjectId = Field(...)
    channel_id: PyObjectId = Field(...)
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlarmRead(AlarmBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    endpoint: AlertEndpointRead = Field(...)
    rule: AlertRuleRead = Field(...)


class AlarmCreate(AlarmBase):
    pass


class AlarmUpdate(AlarmBase):
    pass


class AlarmPaginatedRead(PyBaseModel):
    total: int
    items: List[AlarmRead]


class AlarmSearch(PyPaginatedBaseModel):
    pass
