// Function to add a new task to the todo list
function addTask(task) {
    const todoList = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.appendChild(document.createTextNode(task));

    const completeButton = document.createElement('button');
    completeButton.className = 'btn btn-success btn-sm complete-task';
    completeButton.innerHTML = 'Complete';
    li.appendChild(completeButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm delete-task';
    deleteButton.innerHTML = 'Delete';
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

// Function to save a task to local storage
function saveTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage and add them to the todo list
function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        addTask(task);
    });
}

// Function to toggle the completion status of a task
function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle('completed');
    // Update task in local storage
    updateLocalStorage();
}

// Function to remove a task from the todo list
function removeTask(taskItem) {
    taskItem.remove();
    // Update task in local storage
    updateLocalStorage();
}

// Function to update the tasks in local storage
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll('#todo-list li').forEach(taskItem => {
        tasks.push(taskItem.textContent.replace('CompleteDelete', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load saved tasks from local storage
    loadTasks();

    // Form submission event to add a new task
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = todoInput.value.trim();

        if (task) {
            addTask(task);
            todoInput.value = '';
            saveTask(task);
        }
    });

    // Event delegation for marking tasks as complete and deleting tasks
    todoList.addEventListener('click', function (e) {
        if (e.target.classList.contains('complete-task')) {
            toggleTaskComplete(e.target.parentElement);
        }

        if (e.target.classList.contains('delete-task')) {
            if (confirm('Are you sure you want to delete this task?')) {
                removeTask(e.target.parentElement);
            }
        }
    });
});
