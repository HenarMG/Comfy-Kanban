document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('addBtn');
    const taskInput = document.getElementById('taskInput');
    const columns = document.querySelectorAll('.column');

    // Add task on button click
    addBtn.addEventListener('click', createTask);

    // Add task on "Enter" key press
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            createTask();
        }
    });

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
    createTask("Try dragging me!");
});

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
		
		/*
		DRAGOVER
		Evento DRAGOVER: Cuando un elemento arrastrable pasa sobre este panel o elemnto, se ejecuta
		la función allowDrop. IMPORTANTE PQ por defecto, los navegadores no lo permiten. 	
		
		DROP
		Evento DROP. Al sueltar un elemento arrastrable sobre el panel/elemento, se ejecuta 
		la función drop. Esta función mueve el elemento arrastrado (la tarea o lo que sea) dentro 
		del panel o elemento donde se soltó.		

		*/