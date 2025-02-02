import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskLogState, TASK_LOG_FEATURE_KEY } from './task-log.reduder';

export const selectTaskLogFeature =
  createFeatureSelector<TaskLogState>(TASK_LOG_FEATURE_KEY);

export const selectTasks = createSelector(selectTaskLogFeature, (state) => {
  console.log('STATE', state);
  return state.tasks;
});
