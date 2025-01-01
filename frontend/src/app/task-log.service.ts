import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  private http = inject(HttpClient);

  tasks$: Observable<Task[] | null> = this.http
    .get('http://localhost:4101/tasks')
    .pipe(
      map((data) => data as Task[]),
      catchError((error) => of(error)),
      startWith([])
    );
}
