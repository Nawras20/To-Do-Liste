document.addEventListener("load", documentLoaded());

function documentLoaded() {
    createNewArrayInLocalStorage();
    showTasks();
}

function createNewArrayInLocalStorage() {
    if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify(new Array()));
    }
}

function showTasks() {
    const todos = JSON.parse(localStorage.getItem("todos"));

    document.getElementById("task-list").innerHTML = "";
    const tasklist = document.getElementById('task-list');

    todos.forEach((todo, index) => {
        let div = document.createElement("div");
        div.setAttribute("id", "Todo-" + index);
        tasklist.appendChild(div);

        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
        div.appendChild(li);

        let container = document.createElement("div");
        li.appendChild(container);

        let input = document.createElement("input");
        input.type = "checkbox";
        input.setAttribute("id", index);
        input.setAttribute("class", "form-check-input me-1");
        input.setAttribute("onchange", "checkboxChanged(event)");
        if (todo.done === true) {
            input.setAttribute("checked", true);
        }
        container.appendChild(input);

        let label = document.createElement("label");
        label.setAttribute("class", "form-check-label");
        label.setAttribute("for", index);
        label.textContent = todo.title;
        container.appendChild(label);

        let btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("class", "btn btn-outline-danger");
        btn.setAttribute("onclick", "deleteTask(" + index + ")");
        btn.textContent = "Löschen";
        li.appendChild(btn);
    });
}

function createNewTask() {
    var newTask = document.getElementById('new-task').value;

    if (newTask != "") {
        var todos = JSON.parse(localStorage.getItem("todos"));
        var obj = { title: newTask, done: false }
        todos.push(obj);
        localStorage.setItem("todos", JSON.stringify(todos));

        showTasks();
        document.getElementById('new-task').value = '';
        showMessage();
    }
};

function showMessage() {
    var message = document.createElement("div");
    message.setAttribute("class", "alert alert-success");
    message.textContent = "Neue Aufgabe wurde hinzugefügt.";

    document.getElementById("message").appendChild(message);

    setTimeout(function () {
        document.getElementById("message").innerHTML = "";
    }, 3000);
}

function deleteTask(index) {
    var todos = JSON.parse(localStorage.getItem("todos"));
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    showTasks();
}

function deleteAllTasks() {
    localStorage.setItem("todos", JSON.stringify(new Array()));
    showTasks();
};

function checkboxChanged(e) {
    var todos = JSON.parse(localStorage.getItem("todos"));

    if (e.target.checked === true) {
        todos[e.target.id].done = true;
    } else {
        todos[e.target.id].done = false;
    }

    localStorage.setItem("todos", JSON.stringify(todos));
}