import { Component } from '@angular/core';
import { TaskLogService } from '../task-log.service';
import { Observable, of } from 'rxjs';
import { Task } from '$shared/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks$: Observable<Task[]> = of([]);
  constructor(private taskLogService: TaskLogService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskLogService.getTasks();
    this.tasks$.subscribe((tasks) => {
      console.log('Fetched tasks:', tasks);
    });
  }
}
