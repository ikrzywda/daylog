from datetime import datetime
from typing import Generic, Optional, TypeVar

from pydantic import AliasChoices, AliasGenerator, BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelSerializableBaseModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=AliasGenerator(
            validation_alias=lambda field_name: AliasChoices(
                to_camel(field_name), field_name
            ),
            serialization_alias=to_camel,
        )
    )


class TaskBase(CamelSerializableBaseModel):
    title: str
    contents: str
    duration_seconds: int


class Task(TaskBase):
    id: int
    created_at: str


class TaskUpdate(CamelSerializableBaseModel):
    title: Optional[str]
    contents: Optional[str]
    duration_seconds: Optional[int]


class PaginationParams(CamelSerializableBaseModel):
    page: int
    page_size: int
    search: Optional[str]
    date_from: Optional[datetime]
    date_to: Optional[datetime]


T = TypeVar("T", bound=CamelSerializableBaseModel)


class PaginationResult(CamelSerializableBaseModel, Generic[T]):
    page: int
    page_size: int
    count: int
    data: list[T]
