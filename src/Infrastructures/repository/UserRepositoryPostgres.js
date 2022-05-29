const InvariantError = require('../../Commons/exceptions/InvariantError');
const UserRepository = require('../../Domains/users/UserRepository');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {
    const stmt = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(stmt);

    if (result.rowCount) {
      throw new InvariantError('username tidak tersedia');
    }
  }

  async addUser(registerUser) {
    const { username, password, fullname } = registerUser;
    const id = `user-${this._idGenerator()}`;

    const stmt = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(stmt);

    return new RegisteredUser({
      ...result.rows[0],
    });
  }
}

module.exports = UserRepositoryPostgres;
