import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-log/task-list/task-list.component';
import { TaskLogModule } from './task-log/task-log.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskLogModule, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
