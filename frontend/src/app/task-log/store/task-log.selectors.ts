import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskLogState, TASK_LOG_FEATURE_KEY } from './task-log.reducer';
import { SearchParams } from '../task-log.models';

export const selectTaskLogFeature =
  createFeatureSelector<TaskLogState>(TASK_LOG_FEATURE_KEY);

export const selectTasks = createSelector(selectTaskLogFeature, (state) => {
  return state.tasks;
});

export const selectPaginationState = createSelector(
  selectTaskLogFeature,
  ({ paginationState }) => paginationState
);

export const selectSearchParams = createSelector(
  selectTaskLogFeature,
  ({ paginationState, searchQuery }): SearchParams => ({
    ...paginationState,
    ...searchQuery,
  })
);
