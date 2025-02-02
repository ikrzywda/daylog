import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-log/components/task-list/task-list.component';
import { TaskInputComponent } from './task-log/components/task-input/task-input.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskListComponent, TaskInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
