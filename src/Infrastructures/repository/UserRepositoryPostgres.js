const InvariantError = require('../../Commons/exceptions/InvariantError');
const UserRepository = require('../../Domains/users/UserRepository');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');

class UserRepositoryPostgres extends UserRepository {
  constructor(userModel) {
    super();

    this._userModel = userModel;
  }

  async verifyAvailableUsername(username) {
    const users = await this._userModel.findAll({
      where: {
        username,
      },
    });

    if (users.length) {
      throw new InvariantError('username tidak tersedia');
    }
  }

  async addUser(registerUser) {
    const user = await this._userModel.create({
      ...registerUser,
    });

    return new RegisteredUser(user);
  }

  async getPasswordByUsername(username) {
    const users = await this._userModel.findAll({
      attributes: ['password'],
      where: {
        username,
      },
    });

    if (!users.length) {
      throw new InvariantError('user tidak ditemukan');
    }

    return users[0].password;
  }

  async getIdByUsername(username) {
    const users = await this._userModel.findAll({
      attributes: ['id'],
      where: {
        username,
      },
    });

    if (!users.length) {
      throw new InvariantError('user tidak ditemukan');
    }

    return users[0].id;
  }

  async getUserUsernameById(id) {
    const users = await this._userModel.findAll({
      attributes: ['username'],
      where: {
        id,
      },
    });

    if (!users.length) {
      throw new InvariantError('user tidak ditemukan');
    }

    return users[0].username;
  }
}

module.exports = UserRepositoryPostgres;
