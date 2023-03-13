import time

from pydantic import Field

from app.models.base.base_models import PyBaseModel
from app.models.base.mongodb import PyObjectId
from app.models.business.destination import TeamRead
from app.models.business.alert_rule import AlertRuleRead


class AlarmBase(PyBaseModel):
    label: str = Field(...)
    destination_id: PyObjectId = Field(...)
    rule_id: PyObjectId = Field(...)
    channel_id: PyObjectId = Field(...)
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlarmRead(AlarmBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    destination: TeamRead = Field(...)
    rule: AlertRuleRead = Field(...)

