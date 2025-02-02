import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { TaskLogService } from '../../services/task-log.service';
import { selectTasks } from '../../store/task-log.selectors';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, MatListModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks$ = this.store.select(selectTasks);
  constructor(
    private readonly store: Store,
    private taskLogService: TaskLogService
  ) {
    this.taskLogService.loadTasks();
  }

  handleClick(taskId: number) {
    console.log('ADD TASK', taskId);
  }
}
