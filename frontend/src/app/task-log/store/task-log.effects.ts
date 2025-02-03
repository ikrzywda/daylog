import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { TaskLogApiService } from '../services/task-log-api.service';
import { TaskLogActions } from './task-log.actions';
import { Store } from '@ngrx/store';
import { selectSearchParams } from './task-log.selectors';

function isErrorWithMessagePredicate(
  error: unknown
): error is { message: string } {
  return !!error && typeof error === 'object' && 'message' in error;
}

export const updateSearchParamsEffect = createEffect(
  (
    actions$ = inject(Actions),
    taskLogApiService = inject(TaskLogApiService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(TaskLogActions.updateSearchParams),
      withLatestFrom(store.select(selectSearchParams)),
      exhaustMap(([saerchParamsUpdate, searchParams]) => {
        return taskLogApiService
          .getTasks({ ...searchParams, ...saerchParamsUpdate })
          .pipe(
            map((paginatedResult) =>
              TaskLogActions.didLoadTasksSuccess({ paginatedResult })
            ),
            catchError((error: unknown) =>
              of(
                TaskLogActions.didLoadTasksFail({
                  errorMessage: isErrorWithMessagePredicate(error)
                    ? error.message
                    : 'Uncaught error',
                })
              )
            )
          );
      })
    ),
  { functional: true }
);

export const loadTasksEffectPaginated = createEffect(
  (
    actions$ = inject(Actions),
    taskLogApiService = inject(TaskLogApiService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(TaskLogActions.loadTasks),
      withLatestFrom(store.select(selectSearchParams)),
      exhaustMap(([, state]) => {
        return taskLogApiService.getTasks(state).pipe(
          map((paginatedResult) =>
            TaskLogActions.didLoadTasksSuccess({ paginatedResult })
          ),
          catchError((error: unknown) =>
            of(
              TaskLogActions.didLoadTasksFail({
                errorMessage: isErrorWithMessagePredicate(error)
                  ? error.message
                  : 'Uncaught error',
              })
            )
          )
        );
      })
    ),
  { functional: true }
);

export const addTaskEffect = createEffect(
  (actions$ = inject(Actions), taskLogApiService = inject(TaskLogApiService)) =>
    actions$.pipe(
      ofType(TaskLogActions.addTask),
      exhaustMap(({ draft }) =>
        taskLogApiService.createTask(draft).pipe(
          map((task) => TaskLogActions.didAddTask({ task })),
          catchError((error: unknown) => EMPTY)
        )
      )
    ),
  { functional: true }
);

export const updateTaskEffect = createEffect(
  (
    actions$ = inject(Actions),
    taskLogApiService = inject(TaskLogApiService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(TaskLogActions.updateTask),
      exhaustMap(({ taskId, update }) =>
        taskLogApiService.updateTask(taskId, update).pipe(
          map((task) => TaskLogActions.didUpdateTask({ taskId, task })),
          catchError((error: unknown) => EMPTY)
        )
      )
    ),
  { functional: true }
);

export const deleteTaskEffect = createEffect(
  (actions$ = inject(Actions), taskLogApiService = inject(TaskLogApiService)) =>
    actions$.pipe(
      ofType(TaskLogActions.deleteTask),
      exhaustMap(({ taskId }) =>
        taskLogApiService.deleteTask(taskId).pipe(
          map(() => TaskLogActions.didDeleteTask({ taskId })),
          catchError((error: unknown) => EMPTY)
        )
      )
    ),
  { functional: true }
);
