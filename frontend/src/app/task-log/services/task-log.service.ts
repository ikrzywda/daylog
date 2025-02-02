import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskLogActions } from '../store/task-log.actions';
import { Observable } from 'rxjs';
import { Task } from '../task-log.models';
import { selectTasks } from '../store/task-log.selectors';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  constructor(private store: Store) {}

  getTasks(): Observable<Task[]> {
    return this.store.select(selectTasks);
  }

  loadTasks() {
    this.store.dispatch(TaskLogActions.loadTasks());
  }
}
