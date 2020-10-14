
const app = document.getElementById('root')
const tasksContainer = document.getElementById('tasks')
const taskCompletedContainer = document.getElementById('tasks-completed')
const taskInput = document.getElementById('taskInput')
const taskListCountWrapper = document.getElementById('tasks-count')
const taskCompletedCountWrapper = document.getElementById('tasks-completed-count')
const tasks = [
    {
        title: 'Beli buku',
        completed: true
    },
    {
        title: 'Beli baju',
        completed: false
    },
    {
        title: 'Beli minuman',
        completed: false
    }
]

function taskList() {
    return tasks.filter(task => !task.completed)
}

function taskCompleted() {
    return tasks.filter(task => task.completed)
}

function displayCount() {
    taskListCountWrapper.innerHTML = taskList().length
    taskCompletedCountWrapper.innerHTML = taskCompleted().length
}

function displayTaskList() {
    tasksContainer.innerHTML = ''
    taskList().forEach((task, index) => {
        renderTaskList(task, index, tasksContainer)                
    })
}        

function displayTaskCompleted() {
    taskCompletedContainer.innerHTML = ''
    taskCompleted().forEach((task, index) => {
        renderTaskList(task, index, taskCompletedContainer)
    })
}

function renderTaskList(task, index, target) {
    const listItem = document.createElement('li')
    
    const input = document.createElement('input')
    input.type = 'checkbox'
    input.checked = task.completed
    input.addEventListener('change', e => setCompleteTask(task, e.target.checked))
    listItem.appendChild(input)

    listItem.appendChild(document.createTextNode(task.title))
    listItem.classList.add(`task-${index}`)

    const removeButton = document.createElement('button')
    removeButton.appendChild(document.createTextNode('x'))
    removeButton.addEventListener('click', () => removeTask(task))

    listItem.appendChild(removeButton)

    target.appendChild(listItem)
}

function updateUI() {
    displayCount()
    displayTaskList()
    displayTaskCompleted()
}

updateUI()

taskInput.addEventListener('keydown', function (e) {
    const value = e.target.value;
    if (e.key === 'Enter') {
        addTask(value)
    }
})

function addTask(task) {
    tasks.push({
        title: task,
        completed: false
    })
    taskInput.value = ''

    updateUI()
}
function removeTask(task) {
    const index = tasks.findIndex(item => item.title === task.title)
    const isOk = confirm('Are you sure?')
    if (isOk) {
        tasks.splice(index, 1)

        const taskItem = document.querySelector(`.task-${index}`)
        if (taskItem) {
            taskItem.remove()
        }
    }
}
function setCompleteTask(task, value) {
    const index = tasks.findIndex(item => item.title === task.title)

    tasks[index].completed = value
    updateUI()
    log()
}
function log() {
    console.log(tasks)
}