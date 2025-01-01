import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskLogService } from '../task-log.service';

@Component({
  selector: 'app-task-input',
  imports: [ReactiveFormsModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.css',
})
export class TaskInputComponent {
  taskLogService: TaskLogService = inject(TaskLogService);
  taskFormGroup = new FormGroup({
    title: new FormControl('', Validators.minLength(1)),
    contents: new FormControl('', Validators.minLength(1)),
    duration: new FormControl(0),
  });

  handleSubmitTask() {
    if (!this.taskFormGroup.valid) {
      return;
    }
    const { title, contents, duration } = this.taskFormGroup.value;

    if (!title || !contents || !duration) {
      return;
    }
  }
}
