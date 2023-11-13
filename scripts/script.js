// Main data structure for our tasks
let tasks = [];

// Global DOM selections
const task_list = document.getElementById("task-list");
const default_filter = document.getElementById("default-filter");
const active_filter_button = document.getElementById("active-filter");
const completed_filter_button = document.getElementById("completed-filter");
const sort_button = document.getElementById("priority-sort");

// Mapping our data to the DOM
const displayList = (taskArray) => {
  task_list.innerHTML = "";

  taskArray.forEach((task) => {
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
};

// Handling task deletion

const deleteItem = () => {
  const delete_item = document.querySelectorAll(".task-delete");

  delete_item.forEach((button) => {
    button.addEventListener("click", () => {
      const item_index = parseInt(
        button.parentElement.getAttribute("data-index")
      );

      tasks = tasks.filter((task) => task.id != item_index);
      displayList(tasks);
    });
  });
};

// Handling checkbox functionality

const handleComplete = () => {
  const checkbox = document.querySelectorAll(".task-checkbox");

  checkbox.forEach((check) => {
    check.addEventListener("change", () => {
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
};

// Handling task editing

const editTask = () => {
  const task_text = document.querySelectorAll(".task-name");
  task_text.forEach((task_item) => {
    task_item.addEventListener("dblclick", () => {
      const item_index = parseInt(
        task_item.parentElement.getAttribute("data-index")
      );

      tasks.forEach((task) => {
        if (item_index === task.id) {
          let new_task_value = prompt("What would you like to do instead?");
          if (new_task_value != null) {
            task.task = new_task_value;
          }
        }
        displayList(tasks);
      });
    });
  });
};

// handling priority sorting and filtering

// Creating a copy of our original tasks array to sort and filter freely.

const filterAll = () => {
  default_filter.addEventListener("click", () => {
    if (
      active_filter_button.classList.contains("active") ||
      completed_filter_button.classList.contains("active") ||
      sort_button.classList.contains("active")
    ) {
      active_filter_button.classList.remove("active");
      completed_filter_button.classList.remove("active");
      sort_button.classList.remove("active");
    }

    default_filter.classList.add("active");
    displayList(tasks);
  });
};

const filterActive = () => {
  active_filter_button.addEventListener("click", () => {
    const active_tasks = tasks.filter((task) => !task.completed);

    if (
      default_filter.classList.contains("active") ||
      completed_filter_button.classList.contains("active") ||
      sort_button.classList.contains("active")
    ) {
      default_filter.classList.remove("active");
      completed_filter_button.classList.remove("active");
      sort_button.classList.remove("active");
    }

    active_filter_button.classList.add("active");
    displayList(active_tasks);
  });
};

const filterCompleted = () => {
  completed_filter_button.addEventListener("click", () => {
    const completed_tasks = tasks.filter((task) => task.completed);

    if (
      active_filter_button.classList.contains("active") ||
      default_filter.classList.contains("active") ||
      sort_button.classList.contains("active")
    ) {
      default_filter.classList.remove("active");
      active_filter_button.classList.remove("active");
      sort_button.classList.remove("active");
    }

    completed_filter_button.classList.add("active");

    displayList(completed_tasks);
  });
};

const sortByPriority = () => {
  sort_button.addEventListener("click", () => {
    if (
      active_filter_button.classList.contains("active") ||
      default_filter.classList.contains("active") ||
      completed_filter_button.classList.contains("active")
    ) {
      active_filter_button.classList.remove("active");
      default_filter.classList.remove("active");
      completed_filter_button.classList.remove("active");
    }

    sort_button.classList.add("active");
    const sorted_tasks = tasks.toSorted((a, b) => b.priority - a.priority);
    displayList(sorted_tasks);
  });
};

// Handling our data input, creating a task object and appending it to our tasks data structure

const getData = () => {
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
    displayList(tasks);
  });
};

getData();

// Handling rebinding of events whenever an item is added to or removed from my tasklist.
const event_binding_handler = new MutationObserver(() => {
  editTask();
  deleteItem();
  handleComplete();
  filterAll();
  filterActive();
  filterCompleted();
  sortByPriority();
});

event_binding_handler.observe(task_list, {
  childList: true,
});
