import { Task, TaskUpdate } from '../task-log.models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TaskLogActions = createActionGroup({
  source: 'Task Log',
  events: {
    // Tasks CRUD
    loadTasks: emptyProps(),
    didLoadTasksSuccess: props<{ tasks: Task[] }>(),
    didLoadTasksFail: props<{ errorMessage: string }>(),
    addTask: props<{ task: Task }>(),
    didAddTask: props<{ task: Task }>(),
    didRemoveTask: props<{ taskId: Task['id'] }>(),
    didUpdateTask: props<{ taskId: Task['id']; update: TaskUpdate }>(),
    // Tasks UI
    didSetIsLoading: emptyProps(),
    didUnsetIsLoading: emptyProps(),
  },
});
