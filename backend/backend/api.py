from datetime import datetime, timezone
import json
from logging import Logger
from pathlib import Path
from random import randint
from typing import Any, Final
from fastapi import Depends, FastAPI
from pydantic import AliasChoices, AliasGenerator, BaseModel, ConfigDict
from fastapi.middleware.cors import CORSMiddleware
from pydantic.alias_generators import to_camel
import pydantic

DEFAULT_STORAGE_PATH: Final[Path] = Path(".tasks.json")
logger = Logger(name="api_logger")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

class CamelSerializableBaseModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=AliasGenerator(
            validation_alias=lambda field_name: AliasChoices(to_camel(field_name), field_name),
            serialization_alias=to_camel
        )
    )


class TaskBase(CamelSerializableBaseModel):
    title: str
    contents: str
    duration_seconds: int

class Task(TaskBase):
    id: int
    created_at: str


class TaskStorageService:
    @staticmethod
    def get_tasks_from_storage(path: Path) -> list[Task]:
        with open(path, "r") as fstream:
            f = fstream.read()
            if len(f) == 0:
                return []
            models: Any = json.loads(f)
            if not isinstance(models, list):
                raise Exception("Cannot deserialize storage to a list of models")
            try:
                return [Task(**model) for model in models]
            except pydantic.ValidationError as ve:
                raise Exception("Failed to validate model") from ve


    def __init__(self, path: Path = DEFAULT_STORAGE_PATH):
        if not path.exists():
            logger.info(f"Path {path.absolute()} does not exist, creating")
            path.touch()
        self.storage_path = path
        self.tasks = TaskStorageService.get_tasks_from_storage(self.storage_path)


    def _save_to_storage(self):
        try:
            dumped_tasks = json.dumps([task.model_dump() for task in self.tasks])
        except Exception as e:
            raise Exception("Failed to deserialize tasks") from e
        with open(self.storage_path, "w") as f:
            f.write(dumped_tasks)
    
    def create_and_add_task_to_storage(self, draft: TaskBase) -> Task:
        task = Task(**draft.model_dump(), created_at=datetime.now(tz=timezone.utc).isoformat(), id=randint(1, 10000))
        self.tasks.append(task)
        self._save_to_storage()
        return task

def get_task_storage_service_dep() -> TaskStorageService:
    return TaskStorageService()


@app.get("/tasks", response_model=list[Task])
async def get_tasks(
    task_storage_service: TaskStorageService = Depends(get_task_storage_service_dep)
) -> list[Task]:
    return task_storage_service.tasks

@app.post("/tasks", response_model=Task)
async def create_task(
    payload: TaskBase,
    task_storage_service: TaskStorageService = Depends(get_task_storage_service_dep)
) -> Task:
    return task_storage_service.create_and_add_task_to_storage(payload)
