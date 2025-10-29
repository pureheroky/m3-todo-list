import { Task, TaskStatus, NewTask } from "./types.js";
import { api } from "./api.js";

const tbody = document.getElementById(
  "tasks-table-body"
) as HTMLTableSectionElement;
const form = document.getElementById("task-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const descriptionInput = document.getElementById(
  "description"
) as HTMLInputElement;
const statusSelect = document.getElementById("status") as HTMLSelectElement;
const submitButton = form.querySelector(
  "button[type='submit']"
) as HTMLButtonElement;

let editingId: number | null = null;

export async function renderTasks() {
  const tasks = await api.getAll();
  tbody.innerHTML = "";
  tasks.forEach((task) => tbody.appendChild(createTaskRow(task)));
}

function createTaskRow(task: Task): HTMLTableRowElement {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${task.id}</td>
    <td>${task.title}</td>
    <td>${task.description ?? "—"}</td>
    <td>
      <span class="status ${task.status}">${prettyStatus(task.status)}</span>
    </td>
    <td class="actions">
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </td>
  `;

  const editBtn = tr.querySelector(".edit")!;
  const delBtn = tr.querySelector(".delete")!;

  editBtn.addEventListener("click", () => startEditing(task));
  delBtn.addEventListener("click", async () => {
    if (confirm(`Delete "${task.title}"?`)) {
      await api.delete(task.id);
      showMessage("Task deleted", "error");
      renderTasks();
    }
  });

  return tr;
}

function prettyStatus(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Pending:
      return "Pending";
    case TaskStatus.InProgress:
      return "In Progress";
    case TaskStatus.Done:
      return "Done";
  }
}

function startEditing(task: Task) {
  editingId = task.id;
  titleInput.value = task.title;
  descriptionInput.value = task.description ?? "";
  statusSelect.value = task.status;
  submitButton.textContent = "Save";
  form.scrollIntoView({ behavior: "smooth" });
}

export async function handleFormSubmit(e: SubmitEvent) {
  e.preventDefault();
  const newTask: NewTask = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    status: statusSelect.value as TaskStatus,
  };

  if (!newTask.title) {
    showMessage("Title cannot be empty", "error");
    return;
  }

  if (editingId) {
    await api.update(editingId, newTask);
    showMessage("Task updated", "success");
    editingId = null;
    submitButton.textContent = "Create";
  } else {
    await api.create(newTask);
    showMessage("Task created", "success");
  }

  form.reset();
  renderTasks();
}

function showMessage(text: string, type: "success" | "error") {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = text;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}
