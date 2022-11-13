const express = require('express');
const AuthenticationsHandler = require('./handler');

const routes = (container) => {
  const router = express.Router();
  const handler = new AuthenticationsHandler(container);

  router.post('/', handler.postAuthenticationHandler);

  return router;
};

module.exports = routes;
