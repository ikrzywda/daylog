import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { TaskLogService } from '../../services/task-log.service';
import { selectTasks } from '../../store/task-log.selectors';
import { TaskListItemComponent } from './task-list-item/task-list-item.component';
import { Task, TaskDraft } from '../../task-log.models';
import { DialogTaskInputDialogComponent } from '../task-input-dialog/task-input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    TaskListItemComponent,
    MatIconModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks$ = this.store.select(selectTasks);
  constructor(
    private readonly store: Store,
    private taskLogService: TaskLogService,
    readonly dialog: MatDialog
  ) {
    this.taskLogService.loadTasks();
  }

  handleAdd() {
    const dialogRef = this.dialog.open(DialogTaskInputDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.taskLogService.addTask(result);
      }
    });
  }

  handleEdit(task: Task) {
    const dialogRef = this.dialog.open(DialogTaskInputDialogComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        console.log('RESULT', result);
        this.taskLogService.updateTask(task.id, result);
      }
    });
  }

  handleDelete(taskId: number) {
    this.taskLogService.deleteTask(taskId);
  }
}
