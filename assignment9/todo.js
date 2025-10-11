class Todo {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.isDone = false;
        this.createdAt = new Date();
    }
}

class TodoList {
    constructor() {
        this.todos = [];
    }
    add(todo) {
        this.todos.push(todo);
    }

    remove(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    }

    checkActiveTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.isDone = true;
        }
    }

    getAllTodos(filter = {}) {
        return this.todos.filter(t => filter.active === undefined || t.isDone === !filter.active);
    }
    // es ar iyo pirobashi mara mainc
    getTodoById(id) {
        return this.todos.find(t => t.id === id);
    }
}




const todoList = new TodoList();
todoList.add(new Todo(1, "1"));
todoList.add(new Todo(2, "2"));
todoList.add(new Todo(3, "3"));
todoList.add(new Todo(4, "4"));
todoList.add(new Todo(5, "5"));
todoList.remove(3);
todoList.checkActiveTodo(1);    
console.log("All:", todoList.getAllTodos());
console.log("Active:", todoList.getAllTodos({ active: true }));
console.log("Done:", todoList.getAllTodos({ active: false }));
