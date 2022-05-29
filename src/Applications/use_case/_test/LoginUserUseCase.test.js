const LoginUserUseCase = require('../LoginUserUseCase');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const LoginUserResult = require('../../../Domains/authentications/entities/LoginUserResult');
const RefreshToken = require('../../../Domains/authentications/entities/RefreshToken');
const UserRepository = require('../../../Domains/users/UserRepository');
const TokenManager = require('../../tokenize/TokenManager');

describe('LoginUserUseCase', () => {
  it('should orchestrating the login user correctly', async () => {
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
    };

    const userIdPayload = { id: 'user-123' };
    const refreshTokenPayload = new RefreshToken({ refreshToken: 'abc' });

    const expectedResult = new LoginUserResult({
      refreshToken: 'abc',
      accessToken: 'def',
    });

    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockUserRepository = new UserRepository();
    const mockTokenManager = new TokenManager();

    mockUserRepository.verifyUserCredential = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));
    mockTokenManager.generateRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve('abc'));
    mockAuthenticationRepository.addRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('def'));

    const loginUserUseCase = new LoginUserUseCase({
      authenticationRepository: mockAuthenticationRepository,
      userRepository: mockUserRepository,
      tokenManager: mockTokenManager,
    });

    const loginUserResult = await loginUserUseCase.execute(useCasePayload);

    expect(loginUserResult).toStrictEqual(expectedResult);
    expect(mockUserRepository.verifyUserCredential).toBeCalledWith(useCasePayload);
    expect(mockTokenManager.generateRefreshToken).toBeCalledWith(userIdPayload);
    expect(mockAuthenticationRepository.addRefreshToken).toBeCalledWith(refreshTokenPayload);
    expect(mockTokenManager.generateAccessToken).toBeCalledWith(userIdPayload);
  });
});
