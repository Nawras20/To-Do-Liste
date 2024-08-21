// jshint esversion: 6

document.addEventListener("DOMContentLoaded", documentLoaded);

function documentLoaded() {
    createNewArrayInLocalStorage();
    showTasks();
}

const editModal = document.getElementById('editModal');
if (editModal) {
    editModal.addEventListener('show.bs.modal', event => {
        const button = event.relatedTarget;

        const index = button.getAttribute('id');
        const btnsave = document.getElementById('btnsave');
        btnsave.setAttribute("onClick", "editTask(" + index + ")");

        const tasks = getLocalStorage();
        const task = tasks[index].title;
        const modalBodyInput = editModal.querySelector('.modal-body textarea');
        modalBodyInput.value = task;
    });
}

function createNewArrayInLocalStorage() {
    if (getLocalStorage() === null) {
        var newArray = [];
        setLocalStorage(newArray);
    }
}

function setLocalStorage(value) {
    localStorage.setItem("todos", JSON.stringify(value));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("todos"));
}

function showTasks() {
    const tasks = getLocalStorage();

    const tasklist = document.getElementById('task-list');
    while (tasklist.hasChildNodes()) {
        tasklist.removeChild(tasklist.firstChild);
    }

    const btnDeleteAll = document.getElementById('btn-delete-all');
    
    if (tasks.length == 0) {
        let div = document.createElement("div");
        div.setAttribute("class", "alert alert-warning");
        div.textContent = "Keine Aufgaben verfügbar!";
        tasklist.appendChild(div);
        
        btnDeleteAll.setAttribute("Disabled", "");
    } else {
        if (btnDeleteAll.hasAttribute("Disabled")) {
            btnDeleteAll.removeAttribute("Disabled");
        }
    }

    tasks.forEach((task, index) => {
        let div = document.createElement("div");
        div.setAttribute("id", "Todo-" + index);
        tasklist.appendChild(div);

        let li = document.createElement("li");
        li.setAttribute("class", "row list-group-item d-flex justify-content-between align-items-center");
        div.appendChild(li);

        let container = document.createElement("div");
        container.setAttribute("class", "col-lg-9");
        li.appendChild(container);

        let input = document.createElement("input");
        input.type = "checkbox";
        input.setAttribute("id", index);
        input.setAttribute("class", "form-check-input me-1");
        input.setAttribute("onchange", "checkboxChanged(event)");
        if (task.done === true) {
            input.setAttribute("checked", true);
        }
        container.appendChild(input);

        let label = document.createElement("label");
        label.setAttribute("class", "form-check-label");
        label.setAttribute("for", index);
        label.textContent = task.title;
        container.appendChild(label);

        let buttons = document.createElement("div");
        buttons.setAttribute("class", "col-lg-3");
        li.appendChild(buttons);

        let btnEdit = document.createElement("button");
        btnEdit.type = "button";
        btnEdit.setAttribute("id", index);
        btnEdit.setAttribute("class", "btn btn-outline-secondary btn-sm btns");
        btnEdit.setAttribute("data-bs-toggle", "modal");
        btnEdit.setAttribute("data-bs-target", "#editModal");
        btnEdit.textContent = "Bearbeiten";
        buttons.appendChild(btnEdit);

        let btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("class", "btn btn-outline-danger btn-sm btns");
        btn.setAttribute("onclick", "deleteTask(" + index + ")");
        btn.textContent = "Löschen";
        buttons.appendChild(btn);
    });
}

function createNewTask() {
    var newTask = document.getElementById('new-task').value;

    if (newTask != "") {
        var tasks = getLocalStorage();
        var obj = { title: newTask, done: false };
        tasks.push(obj);
        setLocalStorage(tasks);

        showTasks();
        document.getElementById('new-task').value = '';
        showMessage();
    }
}

function showMessage() {
    var div = document.createElement("div");
    div.setAttribute("class", "alert alert-success");
    div.textContent = "Neue Aufgabe wurde hinzugefügt.";

    const message = document.getElementById("message");
    message.appendChild(div);
    
    setTimeout(function () {
        message.removeChild(message.firstElementChild);
    }, 2000);
}

function deleteTask(index) {
    var tasks = getLocalStorage();
    tasks.splice(index, 1);
    setLocalStorage(tasks);
    showTasks();
}

function deleteAllTasks() {
    var newArray = [];
    setLocalStorage(newArray);
    showTasks();
}

function checkboxChanged(e) {
    var tasks = getLocalStorage();

    if (e.target.checked === true) {
        tasks[e.target.id].done = true;
    } else {
        tasks[e.target.id].done = false;
    }

    setLocalStorage(tasks);
}

function editTask(index) {
    const tasks = getLocalStorage();

    const editModal = document.getElementById('editModal');
    const modalBodyInput = editModal.querySelector('.modal-body textarea');
    tasks[index].title = modalBodyInput.value;

    setLocalStorage(tasks);
    showTasks();
}

