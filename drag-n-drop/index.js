let draggingItem = null;

function getFromLS() {
    return localStorage.getItem('tasks');
}

function renderTasks(tasks) {
    tasks.forEach(item => {
        const container = document.querySelector(`.placeholder[data-task-status="${item.status}"]`);

        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `<span>${item.name}</span>`;
        taskItem.setAttribute('draggable', true);

        container.appendChild(taskItem);
    })
}

function getTasks() {
    const tasks = [
        {
            _id: "1",
            name: "Сходить в магазин",
            status: "new"
        },
        {
            _id: "2",
            name: "Полить цветы",
            status: "new"
        },
        {
            _id: "3",
            name: "Купить молока",
            status: "process"
        },
        {
            _id: "4",
            name: "Купить масло",
            status: "process"
        },
        {
            _id: "5",
            name: "Купить хлеб",
            status: "process"
        },
        {
            _id: "6",
            name: "Починить машину",
            status: "done"
        },
        {
            _id: "7",
            name: "Съездить на дачу",
            status: "done"
        }
    ];

    if (!getFromLS()) {
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const tasksFromLS = JSON.parse(getFromLS());

        renderTasks(tasksFromLS)
    }
    else {
        const tasksFromLS = JSON.parse(localStorage.getItem('tasks'));

        renderTasks(tasksFromLS);
    }

}

function dragstart(event) {
    event.target.classList.add('hold');
    draggingItem = event.target;

    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0)
}

function dragend(event) {
    event.target.classList.remove('hold', 'hide');
    draggingItem = null;
}


function dragover(event) {
    event.preventDefault();
}

function dragenter(event) {
    event.target.classList.add('entered');
}

function dragleave(event) {
    event.target.classList.remove('entered');
}

function dragdrop(event, item) {
    event.target.classList.remove('entered');

    if (item) {
        event.currentTarget.append(item);
    }
    else {
        console.error(item);
    }
}

document.addEventListener('DOMContentLoaded', e => {
    getTasks();

    document.querySelectorAll('.row .task-item').forEach(item => {
        item.addEventListener('dragstart', dragstart)
        item.addEventListener('dragend', dragend)
    })

    document.querySelectorAll('.row .placeholder').forEach(item => {
        item.addEventListener('dragenter', dragenter);
        item.addEventListener('dragover', dragover);
        item.addEventListener('dragleave', dragleave);
        item.addEventListener('drop', (event) => dragdrop(event, draggingItem));
    })
})