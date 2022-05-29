const RefreshToken = require('../../Domains/authentications/entities/RefreshToken');

class LogoutUserUseCase {
  constructor({ authenticationRepository }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(payload) {
    const refreshToken = new RefreshToken(payload);

    await this._authenticationRepository.verifyRefreshToken(refreshToken);
    await this._authenticationRepository.deleteRefreshToken(refreshToken);
  }
}

module.exports = LogoutUserUseCase;
