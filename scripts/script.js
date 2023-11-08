task_list = [];

function getData() {
  const input_form = document.forms["input-form"];

  input_form.addEventListener("submit", (e) => {
    e.preventDefault();

    let task_input = document.getElementById("task-input");
    let task_priority = document.getElementById("task-priority");
    const new_task = { task: task_input.value, priority: task_priority.value };

    task_list.push(new_task);

    task_input.value = "";
    task_priority.value = "0";
  });
}

getData();
