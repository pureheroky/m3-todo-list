export enum TaskStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Done = "done",
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
}

export type NewTask = Omit<Task, "id">;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
