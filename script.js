// --- ÉTAPE 3 : Modèle de données commun ---
const defaultTasks = [
    { id: 1, title: "Pain" },
    { id: 2, title: "Lait" },
    { id: 3, title: "Oeufs" },
    { id: 4, title: "Fromage" }
];
let tasks = JSON.parse(localStorage.getItem('tasks')) || defaultTasks;

const itemsList = document.getElementById('items');
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    itemsList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = task.title;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Supprimer';
        removeButton.addEventListener('click', () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        li.appendChild(removeButton);
        itemsList.appendChild(li);
    });
}

addBtn.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (!title) return;

    const newTask = {
        id: Date.now(),
        title
    };

    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
});

renderTasks();  

