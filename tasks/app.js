let tasksId = 1;
addEventListeners();

function addEventListeners() {
    document.addEventListener("DOMContentLoaded", displayTasks);
    document.getElementsByTagName("button")[0].addEventListener("click", addTask);
    document.getElementById("btn-download").addEventListener("click", downloadFileTasks);
    document.getElementById("btn-upload").addEventListener("click", uploadJson);
}

function createNewTaskElement(taskItem) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    checkBox.type = "checkBox";
    editInput.type = "text";
    listItem.className = "app task-list";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskItem.content;
    if (taskItem.status)
        checkBox.checked = true;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.setAttribute("data-id", taskItem.id);

    return listItem;
}

function displayTasks() {
    let tasks = getDataFromStorage("tasks");
    if (!tasks) {
        console.log("no elements found. clearing...")
        document.getElementById("incomplete-tasks").innerHTML = "";
        document.getElementById("completed-tasks").innerHTML = "";
        return;
    }
    if (tasks.length > 0) {
        tasksId = tasks[tasks.length - 1].id;
        tasksId++;
    } else {
        tasksId = 1;
    }
    tasks.forEach(item => {
        createTask(item);
    });
}

function addTask() {
    // console.log("Add Task...");
    var taskItem = new Item(tasksId++, "", document.getElementById("new-task").value, false);
    var tasks = getDataFromStorage("tasks");
    tasks.push(taskItem);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("new-task").value = "";
    createTask(taskItem);
}

function createTask(taskItem) {
    var listItem = createNewTaskElement(taskItem);
    if (taskItem.status)
        document.getElementById("completed-tasks").appendChild(listItem);
    else
        document.getElementById("incomplete-tasks").appendChild(listItem);
    bindTaskEvents(listItem, changeTaskStatus);
}

function editTask() {
    console.log("Edit Task...");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
        let taskId = listItem.dataset.id;
        let tasks = getDataFromStorage("tasks");
        tasks.forEach(function (item, i) {
            if (item.id === parseInt(taskId)) {
                console.log("Found element " + JSON.stringify(item) + "saving changes.")
                item.content = editInput.value;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
}

function deleteTask() {
    console.log("Delete Task...");
    //Remove the parent list item from the ul
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    var tasks = getDataFromStorage("tasks");
    var itemId = parseInt(listItem.dataset.id);

    let newTasksList = tasks.filter(item => {
        return item.id !== itemId;
    });
    localStorage.setItem("tasks", JSON.stringify(newTasksList));
    ul.removeChild(listItem);
}

function bindTaskEvents(taskListItem) {
    console.log("Bind List item events");
    // select listitems chidlren
    var checkBox = taskListItem.querySelector('input[type="checkbox"]');
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
    editButton.onclick = editTask;
    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = changeTaskStatus;
}

function changeTaskStatus(checkboxElem) {
    var listItem = this.parentNode;
    var tasks = getDataFromStorage("tasks");
    var itemId = parseInt(listItem.dataset.id);
    var status;
    console.log(itemId);
    console.log("checkBoxChangeHandler tasks: " + JSON.stringify(tasks));
    tasks.forEach(function (item, i) {
        console.log("Changing item " + item.id + " status to opposite");
        if (item.id === itemId) {
            status = item.status;
            item.status = !item.status;
        }
    });
    console.log("checkBoxChangeHandler tasks after: " + JSON.stringify(tasks));
    if (status) {
        document.getElementById("incomplete-tasks").appendChild(listItem);
    } else {
        document.getElementById("completed-tasks").appendChild(listItem);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function downloadFileTasks() {
    downloadFile("tasks", "tasks.json");
}

function uploadJson() {
    uploadProjectData("tasks", displayTasks);
}
