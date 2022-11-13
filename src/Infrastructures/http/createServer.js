// const Hapi = require('@hapi/hapi');
// const Jwt = require('@hapi/jwt');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../../swagger_output.json');
const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
//
// const users = require('../../Interfaces/http/api/users');
// const authentications = require('../../Interfaces/http/api/authentications');

const userRoutes = require('../../Interfaces/http/api/users/routes');
const authenticationRoutes = require('../../Interfaces/http/api/authentications/routes');
const todoRoutes = require('../../Interfaces/http/api/todos/routes');

const createServer = async (container) => {
  const server = express();

  server.use(bodyParser.json());

  server.use('/users/', userRoutes(container));
  server.use('/authentications/', authenticationRoutes(container));
  server.use('/todos/', todoRoutes(container));
  server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  server.use((err, req, res, next) => {
    const translatedError = DomainErrorTranslator.translate(err);

    if (translatedError instanceof ClientError) {
      return res.status(translatedError.statusCode).json({
        status: 'fail',
        message: translatedError.message,
      });
    }

    console.log(err);
    return res.status(500).json({
      status: 'error',
      message: 'terjadi kegagalan pada server kami',
    });
  });

  return server;
  // const server = Hapi.server({
  //   host: process.env.HOST,
  //   port: process.env.PORT,
  // });

  // await server.register([
  //   {
  //     plugin: Jwt,
  //   },
  // ]);
  //
  // server.auth.strategy('forumapi_jwt', 'jwt', {
  //   keys: process.env.ACCESS_TOKEN_KEY,
  //   verify: {
  //     aud: false,
  //     iss: false,
  //     sub: false,
  //     maxAgeSec: process.env.ACCESS_TOKEN_AGE,
  //   },
  //   validate: (artifacts) => ({
  //     isValid: true,
  //     credentials: {
  //       id: artifacts.decoded.payload.id,
  //     },
  //   }),
  // });
  //
  // await server.register([
  //   {
  //     plugin: users,
  //     options: {
  //       container,
  //     },
  //   },
  //   {
  //     plugin: authentications,
  //     options: {
  //       container,
  //     },
  //   },
  // ]);

//   server.ext('onPreResponse', (request, h) => {
//     const { response } = request;
//
//     if (response instanceof Error) {
//       const translatedError = DomainErrorTranslator.translate(response);
//
//       if (translatedError instanceof ClientError) {
//         const newResponse = h.response({
//           status: 'fail',
//           message: translatedError.message,
//         });
//         newResponse.code(translatedError.statusCode);
//         return newResponse;
//       }
//
//       if (!translatedError.isServer) {
//         return h.continue;
//       }
//
//       const newResponse = h.response({
//         status: 'error',
//         message: 'terjadi kegagalan pada server kami',
//       });
//       newResponse.code(500);
//       console.log(response);
//       return newResponse;
//     }
//
//     return h.continue;
//   });
//
//   return server;
};

module.exports = createServer;
