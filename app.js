$(document).ready(function () {
    
    loadTodos();
  
    
    $('#addTodoButton').click(function () {
      const newTodo = $('#newTodo').val().trim();
      if (newTodo) {
        addTodo(newTodo);
        $('#newTodo').val('');
        showAlert('Tarea agregada exitosamente', 'success');
      } else {
        showAlert('El campo de tarea no puede estar vacío', 'danger');
      }
    });
  
    
    function loadTodos() {
      const todos = getTodosFromLocalStorage();
      displayTodos(todos);
    }
  
    
    function getTodosFromLocalStorage() {
      return JSON.parse(localStorage.getItem('todos')) || [];
    }
  
    
    function saveTodosToLocalStorage(todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function addTodo(todoText) {
      const todos = getTodosFromLocalStorage();
      const newTodo = { text: todoText, completed: false };
      todos.push(newTodo);
      saveTodosToLocalStorage(todos);
      displayTodos(todos);
    }
    
    function showAlert(message, type) {
      $('#alert').text(message).removeClass('d-none alert-success alert-danger').addClass(`alert-${type}`);
      setTimeout(() => {
        $('#alert').addClass('d-none');
      }, 2000);
    }
  
    function displayTodos(todos) {
      $('#todoList').empty();
      todos.forEach((todo, index) => {
        const todoItem = `<li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                              <input type="checkbox" class="mr-2" ${todo.completed ? 'checked' : ''} data-index="${index}">
                              <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                            </div>
                            <button class="btn btn-danger btn-sm delete-todo" data-index="${index}">Eliminar</button>
                          </li>`;
        $('#todoList').append(todoItem);
      });
    }
  
    $('#todoList').on('change', 'input[type="checkbox"]', function () {
      const index = $(this).data('index');
      const todos = getTodosFromLocalStorage();
      todos[index].completed = !todos[index].completed;
      saveTodosToLocalStorage(todos);
      displayTodos(todos);
    });
  
    $('#todoList').on('click', '.delete-todo', function () {
      const index = $(this).data('index');
      const todos = getTodosFromLocalStorage();
      todos.splice(index, 1);
      saveTodosToLocalStorage(todos);
      displayTodos(todos);
    });
  });