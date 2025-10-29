import { createInMemoryRepository } from "../data/repository";
import { Task, NewTask } from "../models/task";

const repo = createInMemoryRepository<Task>();

// smth for test
(async () => {
  await repo.create({
    id: 1,
    title: "Learn TypeScript",
    status: "in_progress" as any,
  });
  await repo.create({
    id: 2,
    title: "Build backend",
    status: "pending" as any,
  });
})();

export const taskService = {
  async getAll(): Promise<Task[]> {
    return repo.getAll();
  },

  async getById(id: number): Promise<Task | null> {
    return repo.getById(id);
  },

  async create(data: NewTask): Promise<Task> {
    const newTask: Task = { id: Date.now(), ...data };
    return repo.create(newTask);
  },

  async update(id: number, data: Partial<NewTask>): Promise<Task | null> {
    return repo.update(id, data);
  },

  async delete(id: number): Promise<boolean> {
    return repo.delete(id);
  },
};
