const express = require('express');
const UsersHandler = require('./handler');

const routes = (container) => {
  const router = express.Router();
  const handler = new UsersHandler(container);

  router.get('/hello', handler.helloHandler);
  router.post('/', handler.postUserHandler);

  return router;
};

module.exports = routes;
