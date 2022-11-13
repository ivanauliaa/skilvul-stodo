const RegisterTodo = require('../../Domains/todos/entities/RegisterTodo');

class AddTodoUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    const registerTodo = new RegisterTodo(useCasePayload);

    return this._todoRepository.addTodo(registerTodo);
  }
}

module.exports = AddTodoUseCase;
