import { Task, TaskDraft, TaskUpdate } from '../task-log.models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TaskLogActions = createActionGroup({
  source: 'Task Log',
  events: {
    loadTasks: emptyProps(),
    didLoadTasksSuccess: props<{ tasks: Task[] }>(),
    didLoadTasksFail: props<{ errorMessage: string }>(),
    addTask: props<{ draft: TaskDraft }>(),
    didAddTask: props<{ task: Task }>(),
    didRemoveTask: props<{ taskId: Task['id'] }>(),
    updateTask: props<{ taskId: Task['id']; update: TaskDraft }>(),
    didUpdateTask: props<{ taskId: Task['id']; task: Task }>(),
  },
});
