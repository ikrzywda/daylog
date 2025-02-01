import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { Task, TaskDraft } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  private http = inject(HttpClient);
  private readonly route: string = 'http://localhost:4101/tasks';

  taskAdded$ = new Subject<void>();

  tasks$: Observable<Task[] | null> = this.taskAdded$.pipe(
    startWith([]),
    switchMap(() => this.http.get<Task[]>(this.route))
  );

  createTask(draft: TaskDraft) {
    this.http
      .post(this.route, draft)
      .pipe(
        tap(() => {
          this.taskAdded$.next();
        })
      )
      .subscribe();
  }
}
