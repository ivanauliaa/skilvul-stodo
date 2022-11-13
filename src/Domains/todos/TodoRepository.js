class TodoRepository {
  async addTodo(registerTodo) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTodos(owner) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyTodoOwner(id, owner) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTodoById(id) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateTodoById(id) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteTodoById(id) {
    throw new Error('TODO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TodoRepository;
