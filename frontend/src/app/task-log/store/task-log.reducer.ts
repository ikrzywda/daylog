import { createReducer, on } from '@ngrx/store';
import { PaginationState, Task, TaskSearchQuery } from '../task-log.models';
import { TaskLogActions } from './task-log.actions';

export interface TaskLogState {
  tasks: Task[];
  searchQuery: TaskSearchQuery;
  error: string | null;
  paginationState: PaginationState;
}

export const TASK_LOG_FEATURE_KEY = 'taskLog';
const DEFAULT_PAGE_SIZE = 10;

export const initialState: TaskLogState = {
  tasks: [],
  searchQuery: {},
  error: null,
  paginationState: {
    pageSize: DEFAULT_PAGE_SIZE,
    page: 1,
    itemsCount: 0,
  },
};

export const taskLogReducer = createReducer(
  initialState,
  on(TaskLogActions.didUpdatePaginationParams, (state, { page, pageSize }) => ({
    ...state,
    paginationState: { ...state.paginationState, page, pageSize },
  })),
  on(
    TaskLogActions.didLoadTasksSuccess,
    (state, { paginatedResult: { data: tasks, page, pageSize, count } }) => ({
      ...state,
      tasks,
      paginationState: {
        page,
        pageSize,
        itemsCount: count,
      },
      error: null,
    })
  ),
  on(TaskLogActions.didLoadTasksFail, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  })),
  on(TaskLogActions.didAddTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskLogActions.didDeleteTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(({ id }) => id !== taskId),
  })),
  on(TaskLogActions.didUpdateTask, (state, { taskId, task: updatedTask }) => ({
    ...state,
    tasks: state.tasks.map((task) => (task.id === taskId ? updatedTask : task)),
  }))
);
