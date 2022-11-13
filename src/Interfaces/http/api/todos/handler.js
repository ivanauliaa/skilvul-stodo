const AddTodoUseCase = require('../../../../Applications/use_case/AddTodoUseCase');
const GetTodosUseCase = require('../../../../Applications/use_case/GetTodosUseCase');
const GetTodoByIdUseCase = require('../../../../Applications/use_case/GetTodoByIdUseCase');
const UpdateTodoByIdUseCase = require('../../../../Applications/use_case/UpdateTodoByIdUseCase');
const DeleteTodoByIdUseCase = require('../../../../Applications/use_case/DeleteTodoByIdUseCase');

class TodosHandler {
  constructor(container) {
    this._container = container;

    this.postTodoHandler = this.postTodoHandler.bind(this);
    this.getTodosHandler = this.getTodosHandler.bind(this);
    this.getTodoByIdHandler = this.getTodoByIdHandler.bind(this);
    this.putTodoByIdHandler = this.putTodoByIdHandler.bind(this);
    this.deleteTodoByIdHandler = this.deleteTodoByIdHandler.bind(this);
  }

  async postTodoHandler(req, res, next) {
    try {
      const addTodoUseCase = this._container.getInstance(AddTodoUseCase.name);
      const { id: owner } = req.authentication;
      const addedTodo = await addTodoUseCase.execute({ ...req.body, owner });

      res.status(201).json({
        status: 'success',
        data: {
          addedTodo,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getTodosHandler(req, res, next) {
    try {
      const getTodosUseCase = this._container.getInstance(GetTodosUseCase.name);
      const { id: owner } = req.authentication;
      const todos = await getTodosUseCase.execute({ owner });

      res.status(200).json({
        status: 'success',
        data: {
          todos,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getTodoByIdHandler(req, res, next) {
    try {
      const getTodoByIdUseCase = this._container.getInstance(GetTodoByIdUseCase.name);
      const { todoId: id } = req.params;
      const { id: owner } = req.authentication;
      const todo = await getTodoByIdUseCase.execute({ id, owner });

      res.status(200).json({
        status: 'success',
        data: {
          todo,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async putTodoByIdHandler(req, res, next) {
    try {
      const putTodoByIdUseCase = this._container.getInstance(UpdateTodoByIdUseCase.name);
      const { id: owner } = req.authentication;
      const { todoId: id } = req.params;
      await putTodoByIdUseCase.execute({ ...req.body, id, owner });

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteTodoByIdHandler(req, res, next) {
    try {
      const deleteTodoByIdUseCase = this._container.getInstance(DeleteTodoByIdUseCase.name);
      const { id: owner } = req.authentication;
      const { todoId: id } = req.params;
      await deleteTodoByIdUseCase.execute({ id, owner });

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodosHandler;
