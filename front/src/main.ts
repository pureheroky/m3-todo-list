import { renderTasks, handleFormSubmit } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();

  const form = document.getElementById("task-form") as HTMLFormElement;
  form.addEventListener("submit", handleFormSubmit);
});
