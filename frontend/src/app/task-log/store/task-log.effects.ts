import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, of } from 'rxjs';
import { TaskLogApiService } from '../services/task-log-api.service';
import { TaskLogActions } from './task-log.actions';

function isErrorWithMessagePredicate(
  error: unknown
): error is { message: string } {
  return !!error && typeof error === 'object' && 'message' in error;
}

export const loadTasksEffect = createEffect(
  (actions$ = inject(Actions), taskLogApiService = inject(TaskLogApiService)) =>
    actions$.pipe(
      ofType(TaskLogActions.loadTasks),
      exhaustMap(() =>
        taskLogApiService.getAllTasks().pipe(
          map((tasks) => TaskLogActions.didLoadTasksSuccess({ tasks })),
          catchError((error: unknown) =>
            of(
              TaskLogActions.didLoadTasksFail({
                errorMessage: isErrorWithMessagePredicate(error)
                  ? error.message
                  : 'Uncaught error',
              })
            )
          )
        )
      )
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
  (actions$ = inject(Actions), taskLogApiService = inject(TaskLogApiService)) =>
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
