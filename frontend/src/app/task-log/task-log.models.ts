export interface Range<T> {
  start: T;
  end: T;
}

export type TimeRange = Range<Date>;

export interface Task {
  id: number;
  title: string;
  contents: string;
  durationSeconds: number;
  createdAt: Date;
}

export type TaskDraft = Omit<Task, 'id' | 'createdAt'>;
export type TaskUpdate = Partial<TaskDraft>;

export interface TaskSearchQuery {
  search: string | null;
  timeRange: TimeRange | null;
}
