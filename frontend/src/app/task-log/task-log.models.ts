export interface PaginationResult<T> {
  page: number;
  pageSize: number;
  count: number;
  data: T[];
}

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
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface PaginationState {
  pageSize: number;
  page: number;
  itemsCount: number;
}

export type SearchParams = TaskSearchQuery &
  Omit<PaginationState, 'itemsCount'>;
