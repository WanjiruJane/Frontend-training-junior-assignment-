document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from local storage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoToDOM(todo));

    // Add event listener for form submission
    todoForm.addEventListener('submit', event => {
        event.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo) {
            addTodoToDOM(newTodo);
            saveTodoToLocalStorage(newTodo);
            todoInput.value = '';
        }
    });

    // Function to add a todo to the DOM
    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.textContent = todo;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            li.remove();
            removeTodoFromLocalStorage(todo);
        });
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    // Function to save a todo to local storage
    function saveTodoToLocalStorage(todo) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Function to remove a todo from local storage
    function removeTodoFromLocalStorage(todo) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(t => t !== todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
