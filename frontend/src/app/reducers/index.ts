import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import {
  TASK_LOG_FEATURE_KEY,
  taskLogReducer,
  TaskLogState,
} from '../task-log/store/task-log.reducer';

export interface State {
  [TASK_LOG_FEATURE_KEY]: TaskLogState;
}

export const reducers: ActionReducerMap<State> = {
  [TASK_LOG_FEATURE_KEY]: taskLogReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
