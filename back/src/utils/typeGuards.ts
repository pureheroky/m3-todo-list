import { NewTask, TaskStatus } from "../models/task";

export function isNewTask(obj: any): obj is NewTask {
  return (
    typeof obj === "object" &&
    typeof obj.title === "string" &&
    Object.values(TaskStatus).includes(obj.status)
  );
}
