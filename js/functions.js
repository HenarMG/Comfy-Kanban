document.addEventListener('DOMContentLoaded', () => {
    updateClockNav();
    setInterval(updateClockNav, 1000);

    const addBtn = document.getElementById('addBtn');
    const taskInput = document.getElementById('taskInput');
    const columns = document.querySelectorAll('.column');
    const filterBtn = document.getElementById('filterBtn');
    const filterInput = document.getElementById('filterSearch');


    // Add task on button click
    addBtn.addEventListener('click', createTask);

    // Add task on "Enter" key press
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            createTask();
        }
    });

    // Show search input when click on button
    filterBtn.addEventListener('click', () => {
        filterBtn.classList.add('hidden');
        filterInput.classList.remove('hidden');
        filterInput.focus(); 
    });

    // goes back to being a button
    filterInput.addEventListener('blur', () => {
        if (filterInput.value.trim() === "") {
            filterInput.classList.add('hidden');
            filterBtn.classList.remove('hidden');
        }
    });

    filterInput.addEventListener('input', filterTasks, false);

    // Initialize columns with drag & drop events
    columns.forEach(column => {
        const taskList = column.querySelector('.task-list');

        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            column.classList.add('drag-over');
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('drag-over');
            if (draggedElement) {
                taskList.appendChild(draggedElement);
            }
        });
    });

    // Initial placeholder task
    createTask("Try dragging me! Or Double click!!");
});

//Change styles css
const lovelyIcon = document.getElementById('lovely-style');
const sunsetIcon = document.getElementById('sunset-style');
const nightIcon = document.getElementById('night-style');
const plantIcon = document.getElementById('plant-style');

// Add events to elements 
lovelyIcon.addEventListener('click', () => changeStyle('lovely'));
sunsetIcon.addEventListener('click', () => changeStyle('sunset'));
nightIcon.addEventListener('click', () => changeStyle('night'));
plantIcon.addEventListener('click', () => changeStyle('plant'));

let draggedElement = null;

function createTask(text) {
    const input = document.getElementById('taskInput');
    const taskValue = (typeof text === 'string') ? text : input.value.trim();

    if (taskValue === "" && typeof text !== 'string') return;

    // Create task container
    const taskDiv = document.createElement('div');
    taskDiv.className = "single-task";
    taskDiv.setAttribute("draggable", "true");

    // Task text
    const taskContent = document.createElement('p');
    taskContent.textContent = taskValue || "New Task";


    // Edit Task
    taskContent.addEventListener('dblclick', () => {
        taskContent.contentEditable = true;
        taskContent.focus();
        taskContent.classList.add('editable');

        taskDiv.setAttribute("draggable", "false");
    });

    taskContent.addEventListener('blur', () => {
        taskContent.contentEditable = false;
        taskContent.classList.remove('editable');
        taskDiv.setAttribute("draggable", "true");

        if (taskContent.textContent.trim() === "") {
            taskDiv.remove();
            // taskContent.textContent = "Empty Task"; // Default text when empty
        }
    });

    taskContent.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            taskContent.blur();
        }
    });


    // Delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.className = "close-btn";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.addEventListener('click', () => taskDiv.remove());

    // Drag events
    taskDiv.addEventListener('dragstart', (e) => {
        draggedElement = taskDiv;
        setTimeout(() => taskDiv.classList.add('dragging'), 0);
    });

    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('dragging');
        draggedElement = null;
    });

    taskDiv.appendChild(taskContent);
    taskDiv.appendChild(deleteBtn);

    // Add to "To Do" column by default
    document.querySelector('.todo .task-list').appendChild(taskDiv);

    // Clear input
    input.value = "";
    input.focus();
}


// Function to change styles
function changeStyle(chosenStyle) {
    const body = document.body;
    body.className = ''; // Limpia clases previas
    switch (chosenStyle) {
        case 'lovely':
            body.classList.add('lovely-style');
            break;
        case 'sunset':
            body.classList.add('sunset-style');
            break;
        case 'night':
            body.classList.add('night-style');
            break;
        case 'plant':
            body.classList.add('plant-style');
            break;
    }
}

function updateClockNav() {
    const now = new Date();
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsHour = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const date = now.toLocaleDateString('en-EN', optionsDate);
    const hour = now.toLocaleTimeString('en-EN', optionsHour);

    const clockNav = document.getElementById('nav-clock');
    if (!clockNav) return;

    clockNav.textContent = `${date} - ${hour}`;
}

//search between existing tasks in the document
function filterTasks() {
    const filterInput = document.getElementById('filterSearch');
    const textSearch = filterInput.value.toLowerCase().trim();
    const allTheTasks = document.querySelectorAll('.single-task');

    allTheTasks.forEach(task => {
        const taskTitle = task.querySelector('p').textContent.toLowerCase();
        if (taskTitle.includes(textSearch)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}


/*
DRAGOVER
Evento DRAGOVER: Cuando un elemento arrastrable pasa sobre este panel o elemnto, se ejecuta
la función allowDrop. IMPORTANTE PQ por defecto, los navegadores no lo permiten. 	
	
DROP
Evento DROP. Al sueltar un elemento arrastrable sobre el panel/elemento, se ejecuta 
la función drop. Esta función mueve el elemento arrastrado (la tarea o lo que sea) dentro 
del panel o elemento donde se soltó.		

*/