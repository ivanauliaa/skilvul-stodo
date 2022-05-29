const LoginUser = require('../../Domains/authentications/entities/LoginUser');
const LoginUserResult = require('../../Domains/authentications/entities/LoginUserResult');

class LoginUserUseCase {
  constructor({
    authenticationRepository,
    userRepository,
    tokenManager,
  }) {
    this._authenticationRepository = authenticationRepository;
    this._userRepository = userRepository;
    this._tokenManager = tokenManager;
  }

  async execute(payload) {
    const loginUser = new LoginUser(payload);
    const userId = await this._userRepository.verifyUserCredential(loginUser);

    const refreshToken = await this._tokenManager.generateRefreshToken({ id: userId });
    await this._authenticationRepository.addRefreshToken({ refreshToken });
    const accessToken = await this._tokenManager.generateAccessToken({ id: userId });

    return new LoginUserResult({ accessToken, refreshToken });
  }
}

module.exports = LoginUserUseCase;
