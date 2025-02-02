import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import {
  TASK_LOG_FEATURE_KEY,
  taskLogEffects,
  taskLogReducer,
} from './task-log/store';
import { provideEffects } from '@ngrx/effects';
import { TaskListComponent } from './task-log/task-list/task-list.component';

export const routes: Routes = [
  {
    path: 'task-log',
    component: TaskListComponent,
    providers: [
      provideState({ name: TASK_LOG_FEATURE_KEY, reducer: taskLogReducer }),
      provideEffects(taskLogEffects, taskLogEffects),
    ],
  },
];
