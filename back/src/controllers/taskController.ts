import { Request, Response } from "express";
import { ApiResponse } from "../models/apiResponse";
import { taskService } from "../services/taskService";
import { isNewTask } from "../utils/typeGuards";
import { NewTask } from "../models/task";

export async function getAllTasks(
  _req: Request,
  res: Response<ApiResponse<Awaited<ReturnType<typeof taskService.getAll>>>>
) {
  const data = await taskService.getAll();
  res.json({ success: true, data });
}

export async function getTaskById(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<Awaited<ReturnType<typeof taskService.getById>>>>
) {
  const id = Number(req.params.id);
  const task = await taskService.getById(id);
  if (!task) {
    res.status(404).json({ success: false, error: "Task not found" });
    return;
  }
  res.json({ success: true, data: task });
}

export async function createTask(
  req: Request<{}, {}, unknown>,
  res: Response<ApiResponse<Awaited<ReturnType<typeof taskService.create>>>>
) {
  if (!isNewTask(req.body)) {
    res.status(400).json({ success: false, error: "Invalid task data" });
    return;
  }

  const created = await taskService.create(req.body as NewTask);
  res.status(201).json({ success: true, data: created });
}

export async function updateTask(
  req: Request<{ id: string }, {}, Partial<NewTask>>,
  res: Response<ApiResponse<Awaited<ReturnType<typeof taskService.update>>>>
) {
  const id = Number(req.params.id);
  const updated = await taskService.update(id, req.body);
  if (!updated) {
    res.status(404).json({ success: false, error: "Task not found" });
    return;
  }
  res.json({ success: true, data: updated });
}

export async function deleteTask(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<{ deleted: boolean }>>
) {
  const id = Number(req.params.id);
  const deleted = await taskService.delete(id);
  res.json({ success: true, data: { deleted } });
}
