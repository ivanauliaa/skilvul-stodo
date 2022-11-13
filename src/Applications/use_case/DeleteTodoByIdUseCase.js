const TodoOwner = require('../../Domains/todos/entities/TodoOwner');
const TodoId = require('../../Domains/todos/entities/TodoId');

class DeleteTodoByIdUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    const {
      id,
      owner,
    } = useCasePayload;
    const todoOwner = new TodoOwner({ owner });
    const todoId = new TodoId({ id: parseInt(id, 10) });

    await this._todoRepository.verifyTodoOwner(todoId.id, todoOwner.owner);

    return this._todoRepository.deleteTodoById(todoId.id);
  }
}

module.exports = DeleteTodoByIdUseCase;
