from bson import ObjectId
from pydantic import BaseModel, Field


class PyBaseModel(BaseModel):
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PyPaginatedBaseModel(PyBaseModel):
    limit: int = Field(default=10)
    skip: int = Field(default=0, ge=0)
