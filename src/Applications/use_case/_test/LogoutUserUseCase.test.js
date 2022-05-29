const LogoutUserUseCase = require('../LogoutUserUseCase');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');

describe('LogoutUserUseCase', () => {
  it('should orchestrating logout user correctly', async () => {
    const useCasePayload = {
      refreshToken: 'abc',
    };

    const mockAuthenticationRepository = new AuthenticationRepository();

    mockAuthenticationRepository.verifyRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.deleteRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const logoutUserUseCase = new LogoutUserUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    await logoutUserUseCase.execute(useCasePayload);

    expect(mockAuthenticationRepository.verifyRefreshToken).toBeCalledWith(useCasePayload);
    expect(mockAuthenticationRepository.deleteRefreshToken).toBeCalledWith(useCasePayload);
  });
});
