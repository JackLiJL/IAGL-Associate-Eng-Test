
const repository = require('../../src/repository/todo');

describe('TODO repository', () => {
  it('should return the todo list', async () => {
    const expected = {
      todos: [{
        "task": "This is a todo example"
      }]
    };
    const actual = await repository.getTodos();
    expect(actual).toEqual(expected);
  });

  describe('addTodo', () => {
    // Reset to initial state
    beforeEach(() => {
      repository.reset();
    });

    it ('should add a new todo with createdTime and task_id', async () => {
      const newTask = "Learn JavaScript";
      const result = await repository.addTodo(newTask);

      // Verify the valid response
      expect(result).toMatchObject({
        task: newTask,
        createdTime: expect.any(String),
        task_id: expect.any(String)
      });

      // Verify the update in storage
      const updated_todos = await repository.getTodos();
      expect(updated_todos.todos.length).toBe(2);
      expect(updated_todos.todos[1].task).toBe(newTask);
    });

    it('should reject empty and non-string tasks', async () => {
      await expect(repository.addTodo(345)).rejects.toThrow('Incorrect task format');
      await expect(repository.addTodo({})).rejects.toThrow('Incorrect task format');
      await expect(repository.addTodo(null)).rejects.toThrow('Incorrect task format');
      await expect(repository.addTodo("")).rejects.toThrow('Incorrect task format');

      const unchanged_tasks = await repository.getTodos();
      expect(unchanged_tasks.todos.length).toBe(1);
    })
  })
});