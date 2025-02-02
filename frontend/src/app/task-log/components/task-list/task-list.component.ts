import { Component } from '@angular/core';
import { TaskLogService } from '../../services/task-log.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTasks } from '../../store/task-log.selectors';
import { Task } from '../../task-log.models';
import { TaskLogApiService } from '../../services/task-log-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks$ = this.store.select(selectTasks);
  constructor(
    private readonly store: Store,
    private taskLogApiService: TaskLogApiService,
    private taskLogService: TaskLogService
  ) {
    taskLogService.loadTasks();
  }
}
