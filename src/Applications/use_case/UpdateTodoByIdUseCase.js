const TodoOwner = require('../../Domains/todos/entities/TodoOwner');
const TodoId = require('../../Domains/todos/entities/TodoId');
const UpdateTodo = require('../../Domains/todos/entities/UpdateTodo');

class UpdateTodoByIdUseCase {
  constructor({ todoRepository }) {
    this._todoRepository = todoRepository;
  }

  async execute(useCasePayload) {
    const {
      id,
      owner,
      title,
      content,
    } = useCasePayload;
    const todoOwner = new TodoOwner({ owner });
    const todoId = new TodoId({ id: parseInt(id, 10) });
    const updateTodo = new UpdateTodo({ title, content });

    await this._todoRepository.verifyTodoOwner(todoId.id, todoOwner.owner);

    return this._todoRepository.updateTodoById(todoId.id, updateTodo);
  }
}

module.exports = UpdateTodoByIdUseCase;
