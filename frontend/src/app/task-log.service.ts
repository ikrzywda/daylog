import { Injectable } from '@angular/core';
import { Task, TaskDraft } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskLogService {
  private taskList: Task[];

  constructor() {
    this.taskList = [];
  }

  addTask(taskDraft: TaskDraft) {
    this.taskList.push({ ...taskDraft, createdAt: new Date() });
  }

  getTasks(): Task[] {
    return this.taskList;
  }
}
