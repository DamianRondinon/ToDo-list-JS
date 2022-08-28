const input = document.getElementById("input");
const addTaskBtn = document.getElementById("addTask");
const listTask = document.getElementById("list-container");

let tasks = [];

addTaskBtn.addEventListener('click', addTask);

function addTask(){
const task = input.value;

if(task == "") {
    showError("La tarea está vacía"); 
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
    listTask.innerHTML = "";
    tasks.forEach((task)=> {
        const li = document.createElement("li");
        li.innerHTML = `${task.task}<span data-id='${task.id}'>X</span>`;
        listTask.appendChild(li);
    });
}

function showError(error){
const msgError = document.createElement("p");
msgError.textContent = error;

msgError.classList.add("error");

listTask.appendChild(msgError);

setTimeout(() => {
    msgError.remove()
}, 2000);
}