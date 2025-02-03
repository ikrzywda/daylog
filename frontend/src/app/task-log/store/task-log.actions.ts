import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  PaginationResult,
  PaginationState,
  SearchParams,
  Task,
  TaskDraft,
} from '../task-log.models';

export const TaskLogActions = createActionGroup({
  source: 'Task Log',
  events: {
    updateSearchParams: props<Partial<SearchParams>>(),
    didUpdatePaginationParams:
      props<Pick<PaginationState, 'page' | 'pageSize'>>(),
    loadTasks: emptyProps(),
    didLoadTasksSuccess: props<{ paginatedResult: PaginationResult<Task> }>(),
    didLoadTasksFail: props<{ errorMessage: string }>(),
    addTask: props<{ draft: TaskDraft }>(),
    didAddTask: props<{ task: Task }>(),
    deleteTask: props<{ taskId: Task['id'] }>(),
    didDeleteTask: props<{ taskId: Task['id'] }>(),
    updateTask: props<{ taskId: Task['id']; update: TaskDraft }>(),
    didUpdateTask: props<{ taskId: Task['id']; task: Task }>(),
  },
});
