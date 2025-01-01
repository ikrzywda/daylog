import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskInputComponent } from '../task-input/task-input.component';
import { TaskLogService } from '../task-log.service';

@Component({
  selector: 'app-workbench',
  imports: [CommonModule, ReactiveFormsModule, TaskInputComponent],
  templateUrl: './workbench.component.html',
  styleUrl: './workbench.component.css',
})
export class WorkbenchComponent {
  taskLogService = inject(TaskLogService);
  constructor() {}
}
