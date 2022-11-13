const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const TodoRepository = require('../../Domains/todos/TodoRepository');
const RegisteredTodo = require('../../Domains/todos/entities/RegisteredTodo');
const Todo = require('../../Domains/todos/entities/Todo');

class TodoRepositoryPostgres extends TodoRepository {
  constructor(todoModel) {
    super();

    this._todoModel = todoModel;
  }

  async addTodo(registerTodo) {
    const todo = await this._todoModel.create({
      ...registerTodo,
    });

    return new RegisteredTodo(todo);
  }

  async getTodos(owner) {
    const todos = await this._todoModel.findAll({
      where: {
        owner,
      },
    });

    return todos.map((todo) => new Todo(todo));
  }

  async verifyTodoOwner(id, owner) {
    const todos = await this._todoModel.findAll({
      where: {
        id,
      },
    });

    if (!todos.length) {
      throw new NotFoundError('todo tidak ditemukan');
    }

    if (todos[0].owner !== owner) {
      throw new AuthorizationError('restricted resource');
    }
  }

  async getTodoById(id) {
    const todos = await this._todoModel.findAll({
      where: {
        id,
      },
    });

    if (!todos.length) {
      throw new NotFoundError('todo tidak ditemukan');
    }

    return new Todo(todos[0]);
  }

  async updateTodoById(id, payload) {
    await this._todoModel.update({ ...payload }, {
      where: {
        id,
      },
    });
  }

  async deleteTodoById(id) {
    await this._todoModel.update({ deletedAt: new Date() }, {
      where: {
        id,
      },
    });
  }
}

module.exports = TodoRepositoryPostgres;
