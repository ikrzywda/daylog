from datetime import datetime
from typing import Optional

from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import Field


from .schemas import PaginationParams, PaginationResult, Task, TaskBase, TaskUpdate
from .services import TaskStorageService, get_task_storage_service_dep


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def pagination_params_dep(
    page: int = 1,
    page_size: int = Query(alias="pageSize", default=25),
    search: Optional[str] = Query(alias="search", default=None),
    date_from: Optional[datetime] = Query(alias="dateFrom", default=None),
    date_to: Optional[datetime] = Query(alias="dateTo", default=None),
) -> PaginationParams:
    return PaginationParams(
        page=page,
        page_size=page_size,
        search=search,
        date_from=date_from,
        date_to=date_to,
    )


@app.get("/tasks", response_model=list[Task])
async def get_tasks(
    task_storage_service: TaskStorageService = Depends(get_task_storage_service_dep),
) -> list[Task]:
    return task_storage_service.tasks


@app.get("/tasks/paginated", response_model=PaginationResult[Task])
async def get_tasks_paginated(
    pagination_params: PaginationParams = Depends(pagination_params_dep),
    task_storage_service: TaskStorageService = Depends(get_task_storage_service_dep),
) -> PaginationResult[Task]:
    return task_storage_service.get_paginated(pagination_params=pagination_params)


@app.post("/tasks", response_model=Task)
async def create_task(
    payload: TaskBase,
    task_storage_service: TaskStorageService = Depends(get_task_storage_service_dep),
) -> Task:
    return task_storage_service.create_and_add_task_to_storage(payload)


@app.patch("/tasks/{task_id}", response_model=Task)
async def update_task(
    task_id: int,
    payload: TaskUpdate,
    task_storage_service: TaskStorageService = Depends(get_task_storage_service_dep),
) -> Task:
    return task_storage_service.update_task(task_id, payload)


@app.delete("/tasks/{task_id}", status_code=204)
async def delete_task(
    task_id: int,
    task_storage_service: TaskStorageService = Depends(get_task_storage_service_dep),
):
    task_storage_service.delete_task(task_id)
