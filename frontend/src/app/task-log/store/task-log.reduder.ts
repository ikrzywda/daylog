import { Task, TaskSearchQuery } from '$shared/models';
import { createReducer, on } from '@ngrx/store';
import { TaskLogActions } from './task-log.actions';

export interface TaskLogState {
  tasks: Task[];
  searchQuery: TaskSearchQuery;
  error: string | null;
}

export const TASK_LOG_FEATURE_KEY = 'taskLog';

export const initialState: TaskLogState = {
  tasks: [],
  searchQuery: { search: null, timeRange: null },
  error: null,
};

export const taskLogReducer = createReducer(
  initialState,
  on(TaskLogActions.didLoadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    error: null,
  })),
  on(TaskLogActions.didLoadTasksFail, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  })),
  on(TaskLogActions.didAddTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskLogActions.didRemoveTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(({ id }) => id !== taskId),
  })),
  on(TaskLogActions.didUpdateTask, (state, { taskId, update }) => ({
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, update } : task
    ),
  }))
);
