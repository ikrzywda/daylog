export interface TaskDraft {
  title: string;
  contents: string;
  durationSeconds: number;
}

export interface Task extends TaskDraft {
  createdAt: Date;
}
