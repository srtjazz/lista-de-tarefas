const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
let tasks = [];


// carrega as tarefas do LocalStorage ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTaskList();
  }
});

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') return;

  tasks.push(taskText);
  saveTasks();
  renderTaskList();

  newTaskInput.value = '';
}

function updateTask(button) {
  const li = button.parentNode;
  const span = li.querySelector('span');
  const index = Array.from(li.parentNode.children).indexOf(li);
  const newTaskText = prompt('Digite a nova tarefa:', span.innerText.trim());

  if (newTaskText !== null && newTaskText.trim() !== '') {
    tasks[index] = newTaskText.trim();
    saveTasks();
    renderTaskList();
  }
}

function removeTask(button) {
  const li = button.parentNode;
  const index = Array.from(li.parentNode.children).indexOf(li);

  tasks.splice(index, 1);
  saveTasks();
  renderTaskList();
}

function renderTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((taskText) => {
    const li = document.createElement('li');
    li.innerHTML = `
          <span>${taskText}</span>
          <button class="botao-editar" onclick="updateTask(this)">Editar</button>
          <button class="botao-excluir" onclick="removeTask(this)">Remover</button>
        `;
    taskList.appendChild(li);
  });
}