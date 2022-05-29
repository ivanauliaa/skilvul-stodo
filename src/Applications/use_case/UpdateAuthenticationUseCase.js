const AccessToken = require('../../Domains/authentications/entities/AccessToken');
const RefreshToken = require('../../Domains/authentications/entities/RefreshToken');

class UpdateAuthenticationUseCase {
  constructor({ authenticationRepository, tokenManager }) {
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
  }

  async execute(payload) {
    const refreshToken = new RefreshToken(payload);

    await this._authenticationRepository.verifyRefreshToken(refreshToken);
    const userId = await this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = await this._tokenManager.generateAccessToken(userId);

    return new AccessToken({ accessToken });
  }
}

module.exports = UpdateAuthenticationUseCase;
