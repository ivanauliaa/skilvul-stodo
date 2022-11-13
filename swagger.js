const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './src/Interfaces/http/api/users/routes.js',
  './src/Interfaces/http/api/authentications/routes.js',
  './src/Interfaces/http/api/todos/routes.js',
];

swaggerAutogen(outputFile, endpointsFiles);
