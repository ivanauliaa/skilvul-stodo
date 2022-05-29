const UpdateAuthenticationUseCase = require('../UpdateAuthenticationUseCase');
const AccessToken = require('../../../Domains/authentications/entities/AccessToken');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const TokenManager = require('../../tokenize/TokenManager');

describe('UpdateAuthenticationUseCase', () => {
  it('should orchestrating update authentication correctly', async () => {
    const useCasePayload = {
      refreshToken: 'abc',
    };

    const userIdPayload = 'user-123';

    const expectedResult = new AccessToken({
      accessToken: 'def',
    });

    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockTokenManager = new TokenManager();

    mockAuthenticationRepository.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve('user-123'));
    mockTokenManager.generateAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('def'));

    const updateAuthenticationUseCase = new UpdateAuthenticationUseCase({
      authenticationRepository: mockAuthenticationRepository,
      tokenManager: mockTokenManager,
    });

    const accessToken = await updateAuthenticationUseCase.execute(useCasePayload);

    expect(accessToken).toEqual(expectedResult);
    expect(mockAuthenticationRepository.verifyRefreshToken).toBeCalledWith(useCasePayload);
    expect(mockTokenManager.verifyRefreshToken).toBeCalledWith(useCasePayload);
    expect(mockTokenManager.generateAccessToken).toBeCalledWith(userIdPayload);
  });
});
