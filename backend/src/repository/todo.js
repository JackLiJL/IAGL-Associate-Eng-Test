
let todoList = {
  todos: [
    {
      "task": "This is a todo example"
    }
  ]
};

const reset = () => {
  todoList = {
    todos: [
      {
        "task": "This is a todo example"
      }
    ]
  };
};

module.exports = {
  getTodos: () => Promise.resolve(todoList),
  addTodo: (task) => {
    if (!task || typeof task !== 'string') {
      return Promise.reject(new Error('Incorrect task format'));
    }

    const newTodo = {
      task: task.trim(),
      createdTime: new Date().toISOString(),
      task_id: Date.now().toString()
    }

    // Add the task to storage
    todoList.todos.push(newTodo);
    return Promise.resolve(newTodo);
  },
  reset
};