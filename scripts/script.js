tasks = [];

// Mapping our data to the DOM

function displayList() {
  const task_list = document.getElementById("task-list");
  task_list.innerHTML = "";
  tasks.map((task) => {
    console.log(task);
    let list_item = document.createElement("li");
    list_item.innerHTML = `
        <li class="flex task" data-index=${task.id}><input class="task-checkbox" type="checkbox" /><span class="task-name">${task.task}</span><span class="task-delete">X</span></li>`;

    task_list.appendChild(list_item);
  });
}

// Handling our data input

function getData() {
  const input_form = document.forms["input-form"];

  input_form.addEventListener("submit", (e) => {
    e.preventDefault();

    let task_input = document.getElementById("task-input");
    let task_priority = document.getElementById("task-priority");
    const new_task = {
      id: tasks.length,
      task: task_input.value,
      priority: Number(task_priority.value),
      completed: false,
    };

    tasks.push(new_task);

    task_input.value = "";
    task_priority.value = "0";

    displayList();
  });
}

getData();
