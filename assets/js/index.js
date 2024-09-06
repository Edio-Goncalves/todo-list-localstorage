let btns = document.querySelectorAll(".btns button");
let showChange = document.querySelector(".showChange");
let penTaskFilter = document.querySelector("#penTaskFilter");
let comTaskFilter = document.querySelector("#comTaskFilter");
let pendingTodos = document.querySelector(".pendingTodos");
let completeTodos = document.querySelector(".completeTodos");
let todoList = document.querySelectorAll(".todoList");
let addInputField = document.querySelector(".addInputField");
let editInputField = document.querySelector(".editInputField");
let addTaskBtn = document.querySelector(".addTask");
let saveTaskBtn = document.querySelector(".saveTask");
let pending = document.querySelector(".pending");
let completeTasks = document.querySelector(".completeTask");
let deleteAllPenTodos = document.querySelector(".penTodos button");
let deleteAllComTodos = document.querySelector(".comTodos button");
let pendingNum = document.querySelector(".pendingNum");
let completeNum = document.querySelector(".completeNum");

// Alternância entre pendentes e concluídas
btns[0].addEventListener("click", () => {
  showChange.style.left = "0";
  btns[0].style.pointerEvents = "none";
  btns[1].style.pointerEvents = "auto";
  penTaskFilter.style.display = "block";
  comTaskFilter.style.display = "none";
  pendingTodos.style.display = "block";
  completeTodos.style.display = "none";
  todoList.forEach((todo) => {
    todo.offsetHeight >= 320
      ? todo.classList.add("overflow")
      : todo.classList.remove("overflow");
  });
});

btns[1].addEventListener("click", () => {
  showChange.style.left = "50%";
  btns[0].style.pointerEvents = "auto";
  btns[1].style.pointerEvents = "none";
  penTaskFilter.style.display = "none";
  comTaskFilter.style.display = "block";
  pendingTodos.style.display = "none";
  completeTodos.style.display = "block";
  todoList.forEach((todo) => {
    todo.offsetHeight >= 320
      ? todo.classList.add("overflow")
      : todo.classList.remove("overflow");
  });
});

// Ativa botão de adicionar quando tem texto
addInputField.addEventListener("keyup", () => {
  var inputVal = addInputField.value;
  if (inputVal.trim() != 0) {
    addTaskBtn.classList.add("active");
  } else {
    addTaskBtn.classList.remove("active");
  }
});

// Adiciona tarefa
addTaskBtn.onclick = () => {
  let userData = addInputField.value;
  let getLocalStorage = localStorage.getItem("Pending Todos");
  let listArr = getLocalStorage ? JSON.parse(getLocalStorage) : [];
  listArr.push(userData);
  localStorage.setItem("Pending Todos", JSON.stringify(listArr));
  showtask();
  addTaskBtn.classList.remove("active");
};

// Exibe pendentes
function showtask() {
  let getLocalStorage = localStorage.getItem("Pending Todos");
  let listArr = getLocalStorage ? JSON.parse(getLocalStorage) : [];
  pendingNum.textContent = listArr.length;

  if (listArr.length > 1) {
    deleteAllPenTodos.classList.add("active");
  } else {
    deleteAllPenTodos.classList.remove("active");
  }

  let newTodos = "";
  listArr.forEach((element, index) => {
    newTodos += `<li>${element} <div class="action"><button onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button><button onclick="completeTask(${index})"><i class="fa-regular fa-square-check"></i></button><button onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button></div></li>`;
  });
  pending.innerHTML = newTodos;
  addInputField.value = "";
  todoList.forEach((todo) => {
    todo.offsetHeight >= 320
      ? todo.classList.add("overflow")
      : todo.classList.remove("overflow");
  });
}

// Deletar tarefa específica
function deleteTask(index) {
  if (confirm("Are you sure want to delete?")) {
    let getLocalStorage = localStorage.getItem("Pending Todos");
    let listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);
    localStorage.setItem("Pending Todos", JSON.stringify(listArr));
    showtask();
  }
}

// Deletar todas as pendentes
deleteAllPenTodos.addEventListener("click", () => {
  if (confirm("Are you sure want to delete all pending tasks?")) {
    localStorage.setItem("Pending Todos", JSON.stringify([]));
    showtask();
  }
});

// Editar tarefas
function editTask(index) {
  let getLocalStorage = localStorage.getItem("Pending Todos");
  let listArr = JSON.parse(getLocalStorage);
  editInputField.value = index;
  addInputField.value = listArr[index];
  addTaskBtn.style.display = "none";
  saveTaskBtn.style.display = "block";
}

// Salva editada
saveTaskBtn.addEventListener("click", () => {
  let getLocalStorage = localStorage.getItem("Pending Todos");
  let listArr = JSON.parse(getLocalStorage);
  listArr[editInputField.value] = addInputField.value;
  localStorage.setItem("Pending Todos", JSON.stringify(listArr));
  addTaskBtn.style.display = "block";
  saveTaskBtn.style.display = "none";
  addInputField.value = "";
  addTaskBtn.classList.remove("active");
  showtask();
});

// Marca como concluída
function completeTask(index) {
  let getLocalStorage = localStorage.getItem("Pending Todos");
  let listArr = JSON.parse(getLocalStorage);
  let completedTask = listArr.splice(index, 1);
  localStorage.setItem("Pending Todos", JSON.stringify(listArr));
  showtask();

  let completedList = localStorage.getItem("Complete Todos");
  let comArr = completedList ? JSON.parse(completedList) : [];
  comArr.push(completedTask[0]);
  localStorage.setItem("Complete Todos", JSON.stringify(comArr));
  showCompleteTask();
}

// Exibe concluídas
function showCompleteTask() {
  let getLocalStorage = localStorage.getItem("Complete Todos");
  let comArr = getLocalStorage ? JSON.parse(getLocalStorage) : [];
  completeNum.textContent = comArr.length;

  if (comArr.length > 1) {
    deleteAllComTodos.classList.add("active");
  } else {
    deleteAllComTodos.classList.remove("active");
  }

  let completeTasksHTML = "";
  comArr.forEach((element, index) => {
    completeTasksHTML += `<li>${element} <div class="action com"><button onclick="back(${index})"><i class="fa-solid fa-xmark"></i></button><button onclick="comDeleteTask(${index})"><i class="fa-solid fa-trash"></i></button></div></li>`;
  });
  completeTasks.innerHTML = completeTasksHTML;
}

// Deleta uma concluída
function comDeleteTask(index) {
  if (confirm("Are you sure want to delete?")) {
    let getLocalStorage = localStorage.getItem("Complete Todos");
    let comArr = JSON.parse(getLocalStorage);
    comArr.splice(index, 1);
    localStorage.setItem("Complete Todos", JSON.stringify(comArr));
    showCompleteTask();
  }
}

// Deleta all concluídas
deleteAllComTodos.addEventListener("click", () => {
  if (confirm("Are you sure want to delete all completed tasks?")) {
    localStorage.setItem("Complete Todos", JSON.stringify([]));
    showCompleteTask();
  }
});

// Mover concluída para pendentes
function back(index) {
  let getLocalStorage = localStorage.getItem("Complete Todos");
  let comArr = JSON.parse(getLocalStorage);
  let backTodo = comArr.splice(index, 1);
  localStorage.setItem("Complete Todos", JSON.stringify(comArr));
  showCompleteTask();

  let pendingList = localStorage.getItem("Pending Todos");
  let listArr = pendingList ? JSON.parse(pendingList) : [];
  listArr.push(backTodo[0]);
  localStorage.setItem("Pending Todos", JSON.stringify(listArr));
  showtask();
}

// Filtra pendentes
function filterPenTask() {
  let filterInput = penTaskFilter.value.toUpperCase();
  let li = pending.querySelectorAll("li");
  li.forEach((todo) => {
    let textValue = todo.textContent || todo.innerText;
    todo.style.display =
      textValue.toUpperCase().indexOf(filterInput) > -1 ? "" : "none";
  });
}

// Filtra concluídas
function filterCompleteTask() {
  let filterInput = comTaskFilter.value.toUpperCase();
  let li = completeTasks.querySelectorAll("li");
  li.forEach((todo) => {
    let textValue = todo.textContent || todo.innerText;
    todo.style.display =
      textValue.toUpperCase().indexOf(filterInput) > -1 ? "" : "none";
  });
}
