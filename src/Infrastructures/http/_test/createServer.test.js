const createServer = require('../createServer');
const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');

describe('HTTP server', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  it('should response 404 when request unregistered route', async () => {
    const server = await createServer({});

    const response = await server.inject({
      method: 'GET',
      url: '/unregisteredRoute',
    });

    expect(response.statusCode).toEqual(404);
  });

  describe('when POST /users', () => {
    it('should response 201 and persisted user', async () => {
      const requestPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);

      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedUser).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const requestPayload = {
        fullname: 'Dicoding Indonesia',
        password: 'secret',
      };

      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada');
    });

    it('should handle server error correctly', async () => {
      const requestPayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };

      const server = await createServer({});

      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(500);
      expect(responseJson.status).toEqual('error');
      expect(responseJson.message).toEqual('terjadi kegagalan pada server kami');
    });
  });
});
