const input = document.getElementById("input");
const addTaskBtn = document.getElementById("addTask");
const listTasks = document.getElementById("list-container");

let tasks = [];

function recuperarLocalStorage() {
    document.addEventListener('DOMContentLoaded', () => {
        tasks = JSON.parse(localStorage.getItem('tasks'));

        createHTML();
    });

    listTasks.addEventListener('click', deleteTask);
}
recuperarLocalStorage();

function deleteTask(e){
    if(e.target.tagName == 'SPAN'){
        const deleteId = parseInt(e.target.getAttribute('data-id'));
        tasks = tasks.filter((task) => task.id !== deleteId);
        createHTML();

    }

}



addTaskBtn.addEventListener('click', addTask);

function addTask(){
const task = input.value;

if(task == "") {
    showError("La tarea está vacía"); 
    return;
}
const taskObj = {
    task: task,
    id: Date.now(),
};

tasks = [...tasks, taskObj];

createHTML();
input.value = "";
};

function createHTML(){
    listTasks.innerHTML = "";
    tasks.forEach((task)=> {
        const li = document.createElement("li");
        li.innerHTML = `${task.task}<span data-id='${task.id}'>X</span>`;
        listTasks.appendChild(li);
    });

    sendLocalStorage();
}

function sendLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showError(error){
const msgError = document.createElement("p");
msgError.textContent = error;

msgError.classList.add("error");

listTasks.appendChild(msgError);

setTimeout(() => {
    msgError.remove()
}, 2000);
}