const addInput = document.getElementById("INput");
const addSubmit = document.getElementById("Submit");
const clear_ = document.getElementById("Cleare");
const taskContainer = document.getElementById("taskContainer");
const maxLength = 40;
let tasks = [];


document.addEventListener("DOMContentLoaded", loadTasks);

addSubmit.addEventListener("click", function() { 
    if (addInput.value) {
        if (addInput.value.length > maxLength) {
            alert(`Task cannot exceed ${maxLength} characters.`);
        }

        else { 
            const newTask = {
                text: addInput.value.trim(),
                completed: false,
            };
            tasks.push(newTask);
            addTaskElement(newTask);
            saveTasksToLocalStorage();
            addInput.value = '';

        }
        
    } else {
        alert('Please enter a task.');
    }
});

clear_.addEventListener("click", function() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        saveTasksToLocalStorage();
        taskContainer.innerHTML = '';
    }
});

function addTaskElement(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <input type="checkbox" style="width: 30px; height: 30px; border-radius: 5px; accent-color: green;" ${task.completed ? 'checked' : ''}>
            <span class="task-text" style="font-size : 20px; font-weight: bold; color: #333; margin: 0 10px; ${task.completed ? 'text-decoration: line-through;' : ''}">${task.text}</span>
            <button style="width: 30px; height: 30px; background-color: #e74c3c; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer;">X</button>
        </div>
    `;
    taskContainer.appendChild(taskItem);
}

taskContainer.addEventListener("click", function(e) {
    const target = e.target;
    const taskItem = target.parentElement;
    const taskText = taskItem.querySelector(".task-text").textContent;

    if (target.type === "checkbox") {

        const completed = target.checked;
        toggleTaskCompletion(taskText, completed);
        taskItem.classList.toggle("completed", completed);
        taskItem.querySelector(".task-text").style.textDecoration = completed ? 'line-through' : 'none';
    } else if (target.tagName === "BUTTON") {
        taskItem.remove();
        deleteTask(taskText);
    }
});

function toggleTaskCompletion(taskText, completed) {
    tasks = tasks.map(task => {
        if (task.text === taskText) task.completed = completed;
        return task;
    });
    saveTasksToLocalStorage();
}

function deleteTask(taskText) {
    tasks = tasks.filter(task => task.text !== taskText);
    saveTasksToLocalStorage();
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = savedTasks; 
    tasks.forEach(addTaskElement);
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
