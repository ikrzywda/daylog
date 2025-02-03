import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskLogModule } from './task-log/task-log.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskListComponent } from './task-log/components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskLogModule, MatToolbarModule, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
