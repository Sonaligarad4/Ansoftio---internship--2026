let tasks = JSON.parse(localStorage.getItem('smartTasks')) || [];

function saveTasks() {
  localStorage.setItem('smartTasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = '';
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const updated = prompt('Edit task', tasks[index].text);
  if (updated && updated.trim()) {
    tasks[index].text = updated.trim();
    saveTasks();
    renderTasks();
  }
}

function renderTasks(filter = 'all') {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  filtered.forEach(task => {
    const originalIndex = tasks.indexOf(task);
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggleTask(${originalIndex})">✔</button>
        <button onclick="editTask(${originalIndex})">✏️</button>
        <button onclick="deleteTask(${originalIndex})">🗑</button>
      </div>`;
    list.appendChild(li);
  });

  const completed = tasks.filter(t => t.completed).length;
  document.getElementById('stats').innerText =
    `Total: ${tasks.length} | Completed: ${completed} | Pending: ${tasks.length - completed}`;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

renderTasks();