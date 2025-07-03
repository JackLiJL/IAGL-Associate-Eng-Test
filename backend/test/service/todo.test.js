

describe('TODO Service', () => {
  it('should be able to get todos from repository', async () => {
    const expected = {
      todos: [
        {
          task: "This is a task to be done"
        }
      ]
    };
    const todoRepository = {
      getTodos: async () => Promise.resolve(expected)
    };

    const todoService = require('../../src/service/todo')(todoRepository);
    const actual = await todoService.getTodos();
    expect(actual).toEqual(expected);
  });

  describe('createTodo', () => {
    it('should create a new todo when a valid task is providies', async () => {
      const mockRepository = {
        addTodo: jest.fn().mockResolvedValue({
          task: "Learn JavaScript",
          createdTime: "2025-07-02T12:00:00Z",
          task_id: "1234"
        })
      }

      const service = require('../../src/service/todo')(mockRepository);
      const result = await service.createTodo("Learn JavaScript");

      expect(result).toEqual({
        task: "Learn JavaScript",
        createdTime: "2025-07-02T12:00:00Z",
        task_id: "1234"
      });
      expect(mockRepository.addTodo).toHaveBeenCalledWith("Learn JavaScript");
    });

    it('should throw an error if task is empty', async () => {
      const mockRepository = {
        addTodo: jest.fn()
      };

      const service = require('../../src/service/todo')(mockRepository);

      await expect(service.createTodo("")).rejects.toThrow('Task must not be empty');
      await expect(service.createTodo(null)).rejects.toThrow('Task must not be empty');

      expect(mockRepository.addTodo).not.toHaveBeenCalled();
    })
  })
});