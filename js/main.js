// Get references to DOM elements
const newTodoInput = document.getElementById('newTodo');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
let completedTasks = 0;
let pendingTasks = 0;


// Add event listener to the 'Add Todo' button to execute the 'addTodo' function when clicked
addTodoButton.addEventListener('click', addTodo);

// Function to add a new todo item to the list
function addTodo() {
    // Get the input text and trim any leading/trailing spaces
    const todoText = newTodoInput.value.trim();
    if (todoText === '') return; // If the input is empty, exit the function

    // Create DOM elements for the new todo item
    const newTodoItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.classList.add('left-side');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', completeTodo); // Add event listener to the checkbox for completion handling

    const todoTextSpan = document.createElement('span');
    todoTextSpan.classList.add('left-side');
    todoTextSpan.textContent = todoText;

    const editButton = document.createElement('button');
    editButton.classList.add('right-side');
    editButton.classList.add('edit');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', editTodo); // Add event listener to the 'Edit' button for editing handling

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('right-side');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTodo); // Add event listener to the 'Delete' button for deletion handling

    // Append the elements to the new todo item and insert it at the top of the todo list
    newTodoItem.appendChild(checkbox);
    newTodoItem.appendChild(todoTextSpan);
    newTodoItem.appendChild(editButton);
    newTodoItem.appendChild(deleteButton);
    todoList.insertBefore(newTodoItem, todoList.firstChild);
    pendingTasks++;
    newTodoInput.value = ''; // Clear the input after adding the todo

    updateTaskCount();
}

// Function to handle the completion of a todo item
function completeTodo() {
    const todoItem = this.parentElement;
    const editButton = todoItem.querySelector('.edit'); // Get the edit button associated with this todo

    if (this.checked) {
        todoItem.classList.add('done'); // Add a class to the todo item to mark it as completed
        playDingSound(); // Play a sound effect
        editButton.disabled = true; // Disable the edit button when checked
        editButton.classList.add('darkgoldenrod'); // Change the edit button color
        editButton.style.display = 'none'; // Hide the edit button when checked
        completedTasks++;
        pendingTasks--;
    } else {
        todoItem.classList.remove('done'); // Remove the class to mark it as not completed
        editButton.disabled = false; // Enable the edit button when unchecked
        editButton.classList.remove('darkgoldenrod'); // Reset the edit button color
        editButton.style.display = 'block'; // Show the edit button when unchecked
        completedTasks--;
        pendingTasks++;
    }
    todoList.appendChild(todoItem); // Move the completed item to the bottom of the list

    updateTaskCount(); // Update the displayed task counts
}

// Function to handle the deletion of a todo item
function deleteTodo() {
    const todoItem = this.parentElement;
    const isChecked = todoItem.querySelector('input[type="checkbox"]').checked; // Check if the to-do item is checked
    todoItem.classList.add('deleted'); // Add a class to the todo item to mark it for deletion
    todoItem.addEventListener('transitionend', function () {
        todoItem.remove(); // Remove the item from the list after the CSS transition
        if (!isChecked) {
            pendingTasks--;
        }
        updateTaskCount();
    });
    
}

// Function to handle editing a todo item
function editTodo() {
    const todoItem = this.parentElement;
    const todoTextSpan = todoItem.querySelector('span');
    const newText = prompt('Edit the to-do item:', todoTextSpan.textContent); // Prompt the user for a new text

    // Update the todo text if the new text is not empty or null
    if (newText !== null && newText.trim() !== '') {
        todoTextSpan.textContent = newText.trim();
    }
}

// Function to play a sound effect when a todo is completed
function playDingSound() {
    // Add the code for playing the "ding" sound here
    const audio = new Audio('./audio/ding.mp3');
    audio.play();
}

// Function to update the current date and time dynamically
function updateDateTime() {
    const currentDateElement = document.getElementById('currentDate');
    const currentTimeElement = document.getElementById('currentTime');
  
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = currentDate.toLocaleDateString(undefined, options);
  
    currentTimeElement.textContent = currentDate.toLocaleTimeString();
  }

  // Function to count number of task, task completed and task already completed 
  function updateTaskCount() {
    const taskCountElement = document.getElementById('taskCount');
    const completedTaskCountElement = document.getElementById('completedTaskCount');
    const pendingTaskCountElement = document.getElementById('pendingTaskCount');
    const totalTasks = todoList.childElementCount;
  
    taskCountElement.textContent = totalTasks;
    completedTaskCountElement.textContent = completedTasks;
    pendingTaskCountElement.textContent = pendingTasks;
  }
  
  //Update task count when the page loads
  updateTaskCount();

  // Update the date and time when the page loads and refresh it every second
  updateDateTime();
  setInterval(updateDateTime, 1000);

  document.addEventListener('DOMContentLoaded', function () {
    pendingTasks = todoList.childElementCount;
    updateTaskCount(); // Update the displayed task counts
});

