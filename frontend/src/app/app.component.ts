import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-log/components/task-list/task-list.component';
import { TaskInputDialog } from './task-log/components/task-input-dialog/task-input-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskListComponent, TaskInputDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
