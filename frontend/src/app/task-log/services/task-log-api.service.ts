import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import {
  PaginationResult,
  SearchParams,
  Task,
  TaskDraft,
} from '../task-log.models';

@Injectable({
  providedIn: 'root',
})
export class TaskLogApiService {
  private readonly route: string = 'http://localhost:4101/tasks';
  constructor(private http: HttpClient) {}

  taskAdded$ = new Subject<void>();

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.route);
  }

  getTasks(searchParams: SearchParams): Observable<PaginationResult<Task>> {
    console.log('SEARCH PARAMS', searchParams);
    return this.http.get<PaginationResult<Task>>(`${this.route}/paginated`, {
      params: { ...searchParams },
    });
  }

  createTask(draft: TaskDraft): Observable<Task> {
    return this.http.post<Task>(this.route, draft);
  }

  updateTask(taskId: number, update: TaskDraft): Observable<Task> {
    return this.http.patch<Task>(`${this.route}/${taskId}`, update);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.route}/${taskId}`);
  }
}
