import time
from typing import List

from pydantic import Field

from models.fastapi.base_models import PyBaseModel, PyPaginatedBaseModel
from models.fastapi.mongodb import PyObjectId


class DestinationBase(PyBaseModel):
    label: str = Field(...)
    webhook_urls: List[str] = Field([])
    slack_urls: List[str] = Field([])
    emails: List[str] = Field([])
    alert_rule_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class DestinationRead(DestinationBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alert_rules: List[dict] = Field([])


class DestinationCreate(DestinationBase):
    pass


class DestinationUpdate(DestinationBase):
    pass


class DestinationPaginatedRead(PyBaseModel):
    total: int
    items: List[DestinationRead]


class DestinationSearch(PyPaginatedBaseModel):
    pass
