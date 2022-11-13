const express = require('express');
const TodosHandler = require('./handler');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const routes = (container) => {
  const router = express.Router();
  const handler = new TodosHandler(container);

  router.post('/', jwtMiddleware(container), handler.postTodoHandler);
  router.get('/', jwtMiddleware(container), handler.getTodosHandler);
  router.get('/:todoId', jwtMiddleware(container), handler.getTodoByIdHandler);
  router.put('/:todoId', jwtMiddleware(container), handler.putTodoByIdHandler);
  router.delete('/:todoId', jwtMiddleware(container), handler.deleteTodoByIdHandler);

  return router;
};

module.exports = routes;
