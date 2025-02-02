import { Task } from '$shared/models';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTasks } from './store/task-log.selectors';
import { TaskLogActions } from './store/task-log.actions';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  constructor(private store: Store) {
    console.log('INIT');
    this.store.dispatch(TaskLogActions.loadTasks());
  }

  getTasks(): Observable<Task[]> {
    return this.store.select(selectTasks);
  }
}
