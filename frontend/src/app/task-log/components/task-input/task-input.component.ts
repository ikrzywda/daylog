import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskLogService } from '../../services/task-log.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-input',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss',
})
export class TaskInputComponent {
  constructor(private taskLogService: TaskLogService) {}

  taskInputFormGroup = new FormGroup({
    title: new FormControl('', Validators.minLength(1)),
    contents: new FormControl('', Validators.minLength(1)),
    durationSeconds: new FormControl(
      '',
      Validators.pattern('^(0|[1-9][0-9]*)$')
    ),
  });

  handleSumbit() {
    const { title, contents, durationSeconds } = this.taskInputFormGroup.value;
    if (!title || !contents || !durationSeconds) {
      return;
    }
    this.taskLogService.addTask({
      title,
      contents,
      durationSeconds: parseInt(durationSeconds),
      categories: [],
    });
  }
}
