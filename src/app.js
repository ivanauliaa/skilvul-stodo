require('dotenv').config();
const createServer = require('./Infrastructures/http/createServer');
const container = require('./Infrastructures/container');

const start = async () => {
  const server = await createServer(container);
  const port = process.env.PORT;
  const host = process.env.HOST;

  server.listen(port, host, () => {
    console.log(`server start at ${host}:${port}`);
  });
};

start();
