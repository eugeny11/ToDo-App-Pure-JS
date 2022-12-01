//Find elements on page
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = []

if (localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTask(task))
}



checkEmptyList()

//Add task

form.addEventListener('submit', addTask)

//Delete task

tasksList.addEventListener('click', deleteTask)

//Sign task done

tasksList.addEventListener('click', doneTask)

//Functions

    function addTask(event){
     //Cancel form submit
     event.preventDefault();
    
     //Take task text from form input
 
     const taskText = taskInput.value;


    //Describe task as an object
     const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
     }

     //Add task to massive

     tasks.push(newTask)

     //Add to browser LocalStorage

     saveToLocalStorage()

     renderTask(newTask);
 
     //Clean input and return focus
 
     taskInput.value = '';
     taskInput.focus();
     checkEmptyList()
}

function deleteTask(event){
    
    if (event.target.dataset.action !== 'delete') return
   
        const parentNode = event.target.closest('.list-group-item');

        //Define task ID

        const id = Number(parentNode.id)

        //Remove a task from task massive

        tasks = tasks.filter((task) => task.id !== id)

        saveToLocalStorage()

        //Remove a task from layout

        parentNode.remove();
        checkEmptyList()
}

function doneTask(){

    if (event.target.dataset.action !== 'done') return
    
        const parentNode = event.target.closest('.list-group-item');

        //Define task id
        const id = Number(parentNode.id);

        const task = tasks.find((task) => task.id === id)

        task.done = !task.done

        saveToLocalStorage()

        const taskTitle = parentNode.querySelector('.task-title');

        taskTitle.classList.toggle('task-title--done');
    
}

function checkEmptyList(){

    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`;
    tasksList.insertAdjacentHTML('afterbegin',emptyListHTML)
    }

    if (tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove : null;
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function renderTask(task){
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'
 
    //Form layout for new task

    const taskHtml = `
    <li id='${task.id}' class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>
`
    // Add task on page

    tasksList.insertAdjacentHTML('beforeend', taskHtml);
}