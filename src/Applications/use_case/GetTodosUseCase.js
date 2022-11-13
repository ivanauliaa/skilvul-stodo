const TodoOwner = require('../../Domains/todos/entities/TodoOwner');

class GetTodosUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    const todoOwner = new TodoOwner(useCasePayload);

    return this._todoRepository.getTodos(todoOwner.owner);
  }
}

module.exports = GetTodosUseCase;
