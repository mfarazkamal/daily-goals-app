const title = document.getElementById("title");
const description = document.getElementById("description");
const form = document.querySelector("form");
const tasksAppend = document.querySelector(".container");

const tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

showAllTasks();

function showAllTasks() {
  tasks.forEach((value, index) => {
    const div = document.createElement("div");
    div.setAttribute("class", "tasks");

    const divDescription = document.createElement("div");
    div.append(divDescription);

    const p = document.createElement("p");
    p.innerText = value.title;
    divDescription.append(p);

    const span = document.createElement("span");
    span.innerText = value.description;
    divDescription.append(span);

    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "deleteBtn");
    delBtn.innerText = "-";
    delBtn.addEventListener("click", () => {
      removeTasks();
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showAllTasks();
    });
    div.append(delBtn);

    tasksAppend.append(div);
  });
}

const removeTasks = function () {
  tasks.forEach((value) => {
    const div = document.querySelector(".tasks");
    div.remove();
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  removeTasks();
  tasks.push({
    title: title.value,
    description: description.value,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showAllTasks();
});
