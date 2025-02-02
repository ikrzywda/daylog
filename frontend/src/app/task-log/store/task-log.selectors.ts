import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskLogState, TASK_LOG_FEATURE_KEY } from './task-log.reducer';

export const selectTaskLogFeature =
  createFeatureSelector<TaskLogState>(TASK_LOG_FEATURE_KEY);

export const selectTasks = createSelector(selectTaskLogFeature, (state) => {
  return state.tasks;
});
