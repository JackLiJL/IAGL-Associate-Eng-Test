const todoService = (repository) => {
  return {
    getTodos: async () => {
      return await repository.getTodos()
    },
    createTodo: async (task) => {
      if (!task) {
        throw new Error('Task must not be empty');
      }
      
      return repository.addTodo(task);
    }
  };
};

module.exports = todoService;