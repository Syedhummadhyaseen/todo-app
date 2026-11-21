const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

function saveTasks() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("todo-tasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    li.dataset.index = index;
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", function () {
  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }
  tasks.push({ text: text, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

taskList.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) {
    return;
  }
  const index = Number(li.dataset.index);
  if (e.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);
  } else {
    tasks[index].completed = !tasks[index].completed;
  }
  saveTasks();
  renderTasks();
});

loadTasks();