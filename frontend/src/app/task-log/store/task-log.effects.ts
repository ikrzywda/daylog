import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatWith, map, of } from 'rxjs';
import { TaskLogActions } from './task-log.actions';
import { TaskLogApiService } from '../task-log-api.service';

export const loadTasks = createEffect(
  (actions$ = inject(Actions), taskLogApiService = inject(TaskLogApiService)) =>
    actions$.pipe(
      ofType(TaskLogActions.loadTasks),
      concatWith(
        of(TaskLogActions.didSetIsLoading),
        taskLogApiService.getAllTasks().pipe(
          map((tasks) => TaskLogActions.didLoadTasksSuccess({ tasks })),
          catchError(({ message }: { message: string }) =>
            of(TaskLogActions.didLoadTasksFail({ errorMessage: message }))
          )
        )
      )
    ),
  { functional: true }
);
