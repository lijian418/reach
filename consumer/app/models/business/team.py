import time
from typing import List, Optional

from pydantic import Field

from app.models.base.base_models import PyBaseModel
from app.models.base.mongodb import PyObjectId


class TeamBase(PyBaseModel):
    label: str = Field(...)
    webhook_urls: List[str] = Field([])
    emails: List[str] = Field([])
    user_ids: List[PyObjectId] = Field([])
    created_at: float = Field(default_factory=lambda: time.time())
    updated_at: float = Field(default_factory=lambda: time.time())


class TeamRead(TeamBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
