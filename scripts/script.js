// Main data structure for our tasks
let tasks = [];

// Global DOM selections
const task_list = document.getElementById("task-list");

// Mapping our data to the DOM
function displayList() {
  task_list.innerHTML = "";

  taskArray.map((task) => {
    // Building our outer task item
    let task_item = document.createElement("li");
    task_item.classList.add("flex", "task");
    task_item.setAttribute("data-index", `${task.id}`);

    //Building our checkbox
    const task_checkbox = document.createElement("input");
    task_checkbox.setAttribute("type", "checkbox");
    task_checkbox.classList.add("task-checkbox");

    //setting our checkbox state depending on our task completed property
    task_checkbox.checked = task.completed;

    //Building our task text
    const task_text = document.createElement("span");
    task_text.classList.add("task-name");
    task_text.innerHTML = `${task.task}`;

    //Building our delete task "button"
    const task_delete = document.createElement("span");
    task_delete.innerText = "x";
    task_delete.classList.add("task-delete");

    // combining our elements
    task_item.append(task_checkbox, task_text, task_delete);

    task_list.appendChild(task_item);
  });
}

// Handling task deletion

function deleteItem() {
  const delete_item = document.querySelectorAll(".task-delete");

  delete_item.forEach((button) => {
    button.addEventListener("click", () => {
      const item_index = parseInt(
        button.parentElement.getAttribute("data-index")
      );

      tasks = tasks.filter((task) => task.id != item_index);
      displayList();
    });
  });
}

// Handling checkbox functionality

function handleComplete() {
  const checkbox = document.querySelectorAll(".task-checkbox");

  checkbox.forEach((check) => {
    check.addEventListener("click", () => {
      const isChecked = check.checked;
      const item_index = parseInt(
        check.parentElement.getAttribute("data-index")
      );

      tasks = tasks.map((task) => {
        if (task.id === item_index) {
          if (isChecked) {
            task.completed = true;
          } else {
            task.completed = false;
          }
        }
        return task;
      });
    });
  });
}

// Handling task editing

function editTask() {
  const task_text = document.querySelectorAll(".task-name");
  task_text.forEach((task_item) => {
    task_item.addEventListener("dblclick", () => {
      const item_index = parseInt(
        task_item.parentElement.getAttribute("data-index")
      );

      tasks.forEach((task) => {
        if (item_index === task.id) {
          let new_task_value = prompt("What would you like to do instead?");
          task.task = new_task_value;
        }
        displayList();
      });
    });
  });
}

// handling priority sorting and filtering

// Creating a copy of our original tasks array to sort and filter freely.

function handleDefaultFilter() {
  const default_filter = document.getElementById("default-filter");
  default_filter.addEventListener("click", () => {
    displayList();
  });
}

function handleActiveFilter() {
  const active_filter = document.getElementById("active-filter");
  active_filter.addEventListener("click", () => {
    displayList();
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

    // Initializing list after every form submission
    displayList();
  });
}

getData();

// Handling rebinding of events whenever li is added to my tasklist.
const event_binding_handler = new MutationObserver(() => {
  editTask();
  deleteItem();
  handleComplete();
  handleDefaultFilter();
  handleActiveFilter();
});

event_binding_handler.observe(task_list, {
  childList: true,
});
