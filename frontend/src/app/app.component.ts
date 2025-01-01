import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkbenchComponent } from './workbench/workbench.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WorkbenchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
