const API_URL = "http://localhost:3000/todos";
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Fetch and display todos from backend
async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        listContainer.innerHTML = ""; // Clear list
        todos.forEach(todo => {
            renderTodo(todo);
        });
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

// Render a single todo item in the list
function renderTodo(todo) {
    let li = document.createElement("li");
    li.innerHTML = todo.title;
    li.setAttribute("data-id", todo.id);
    if (todo.completed) {
        li.classList.add("checked");
    }
    
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
}

// Add a new todo task
async function addTask() {
    const title = inputBox.value.trim();
    if (title === '') {
        alert("You must write something!");
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                completed: false
            })
        });
        
        if (response.ok) {
            const newTodo = await response.json();
            renderTodo(newTodo);
            inputBox.value = "";
        } else {
            console.error("Failed to add task on the server");
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

// Handle toggling and deleting todos
listContainer.addEventListener("click", async function(e) {
    const li = e.target.closest("li");
    if (!li) return;
    const todoId = li.getAttribute("data-id");

    if (e.target.tagName === "LI") {
        const isCompleted = !li.classList.contains("checked");
        try {
            const response = await fetch(`${API_URL}/${todoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: li.firstChild.textContent.trim(),
                    completed: isCompleted
                })
            });
            if (response.ok) {
                li.classList.toggle("checked");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }
    else if (e.target.tagName === "SPAN") {
        try {
            const response = await fetch(`${API_URL}/${todoId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                li.remove();
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
}, false);

// Initial load
fetchTodos();