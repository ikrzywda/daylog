import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Task } from '../../../task-log.models';

@Component({
  selector: 'app-task-list-item',
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './task-list-item.component.html',
  styleUrl: './task-list-item.component.scss',
})
export class TaskListItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() onDelete = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();

  handleDelete() {
    this.onDelete.emit();
  }

  handleEdit() {
    this.onEdit.emit();
  }
}
