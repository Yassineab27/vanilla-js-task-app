// DEFINE UI VARS
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task")
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

// LOAD ALL EVENT LISTENERS
function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", deleteTasks);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener("input", filterTasks);
}
loadEventListeners()

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    };
    tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.textContent = task; 
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    })
}

// ADD TASK
function addTask(e) {
    if(taskInput.value === "") {
        alert("Please, Add the Task!");
        taskInput.value.style.display = "none";
    }

    // Create Li
    const li = document.createElement("li");
    li.className = "collection-item";

    // Create Text Node
    li.textContent = taskInput.value; // appendChild(document.createTextNode())

    // Create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    // Add Icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link
    li.appendChild(link);

    // Apppen the li
    taskList.appendChild(li);

    // Store in LS
    storeInLocalStorage(taskInput.value);

    // Clear Input
    taskInput.value = "";
    e.preventDefault();
    console.log(li)
};

// Save In the Local Storage
function storeInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete Tasks (X)
function deleteTasks(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        // console.log(e.target);
        if(confirm("Are You Sure ?")) {
            e.target.parentElement.parentElement.remove();
        }
    }

    deleteTasksFromLS(e.target.parentElement.parentElement);
};

function deleteTasksFromLS(liTask) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    };

    tasks.forEach((task, index) => {
        if(task === liTask.textContent) {
            tasks.splice(index, 1)
        };
    })

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete All Tasks (Clear)
function clearTasks(e) {
    console.log(e.target)
    // while (taskList.firstChild) {
    //     taskList.removeChild(taskList.firstChild);
    // }

    // taskList.innerHTML = ""; // lest fast

    document.querySelectorAll(".collection-item").forEach(task => {
        task.remove();
    });

    clearLocalStorage()
};

function clearLocalStorage() {
    localStorage.clear()
};

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll(".collection-item").forEach(task => {
        if(task.textContent.toLowerCase().includes(text)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";    
        }
    });
}

