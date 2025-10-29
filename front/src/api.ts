import { Task, NewTask, ApiResponse } from "./types.js";

const API_URL = "http://localhost:3000/tasks";

export const api = {
  async getAll(): Promise<Task[]> {
    const res = await fetch(API_URL);
    const json: ApiResponse<Task[]> = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data || [];
  },

  async create(task: NewTask): Promise<Task> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const json: ApiResponse<Task> = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data!;
  },

  async update(id: number, updates: Partial<NewTask>): Promise<Task> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const json: ApiResponse<Task> = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data!;
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    const json: ApiResponse<{ deleted: boolean }> = await res.json();
    if (!json.success) throw new Error(json.error);
  },
};
