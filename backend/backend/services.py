import json
from datetime import datetime, timezone
from logging import Logger
from pathlib import Path
from random import randint
from typing import Any, Final, Optional

import pydantic

from .schemas import PaginationParams, PaginationResult, Task, TaskBase, TaskUpdate

logger = Logger(name="api_logger")
DEFAULT_STORAGE_PATH: Final[Path] = Path(".tasks.json")


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

    def _find_task(self, task_id: int) -> Optional[Task]:
        return next((task for task in self.tasks if task.id == task_id), None)

    def get_paginated(
        self, pagination_params: PaginationParams
    ) -> PaginationResult[Task]:
        print(pagination_params)
        def filter_task_predicate(
            task: Task, pagination_params: PaginationParams
        ) -> bool:
            search = pagination_params.search
            date_from = pagination_params.date_from
            date_to = pagination_params.date_to
            string_match = (
                search in task.title.lower() or search in task.contents.lower()
                if search
                else True
            )
            created_at_date = datetime.fromisoformat(task.created_at)
            date_from_match = date_from <= created_at_date if date_from else True
            date_to_match = created_at_date <= date_to if date_to else True
            return string_match and date_from_match and date_to_match

        filtered_data = [
            task
            for task in self.tasks
            if filter_task_predicate(
                task,
                pagination_params,
            )
        ]
        count = len(filtered_data)
        start_index = (pagination_params.page - 1) * pagination_params.page_size
        end_index = start_index + pagination_params.page_size
        page_contents = filtered_data[start_index:end_index]

        return PaginationResult[Task](
            page=pagination_params.page,
            page_size=pagination_params.page_size,
            count=count,
            data=page_contents,
        )

    def create_and_add_task_to_storage(self, draft: TaskBase) -> Task:
        task = Task(
            **draft.model_dump(),
            created_at=datetime.now(tz=timezone.utc).isoformat(),
            id=randint(1, 10000),
        )
        self.tasks.append(task)
        self._save_to_storage()
        return task

    def update_task(self, id: int, update: TaskUpdate) -> Task:
        task_to_update = self._find_task(id)
        if task_to_update is None:
            raise Exception(f"Did not find task with id {id}")
        updated_draft = task_to_update.model_dump()
        for key, value in update.model_dump().items():
            if key is not None and value is not None:
                updated_draft[key] = value

        updated_task = Task(**updated_draft)
        self.tasks = [task if task.id != id else updated_task for task in self.tasks]
        self._save_to_storage()
        return updated_task

    def delete_task(self, task_id: int):
        task = self._find_task(task_id)
        if task is None:
            raise Exception(f"Did not find task with id {id}")
        self.tasks = [task for task in self.tasks if task.id != task_id]
        self._save_to_storage()


def get_task_storage_service_dep() -> TaskStorageService:
    return TaskStorageService()
