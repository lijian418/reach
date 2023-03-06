import time
from typing import List, Optional

from pydantic import Field

from app.models.base.base_models import PyBaseModel
from app.models.base.mongodb import PyObjectId


class AlertEndpointBase(PyBaseModel):
    label: str = Field(...)
    webhook_urls: List[str] = Field([])
    emails: List[str] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class AlertEndpointRead(AlertEndpointBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
