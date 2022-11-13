const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../../../../Applications/use_case/LogoutUserUseCase');
const UpdateAuthenticationUseCase = require('../../../../Applications/use_case/UpdateAuthenticationUseCase');
const AddUserUseCase = require("../../../../Applications/use_case/AddUserUseCase");

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    // this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    // this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(req, res, next) {
    try {
      const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
      const { accessToken, refreshToken } = await loginUserUseCase.execute(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          refreshToken,
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  //
  // async putAuthenticationHandler(request, h) {
  //   const updateAuthenticationUseCase = this._container
  //     .getInstance(UpdateAuthenticationUseCase.name);
  //   const accessToken = await updateAuthenticationUseCase.execute(request.payload);
  //
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       accessToken,
  //     },
  //   });
  //   return response;
  // }
  //
  // async deleteAuthenticationHandler(request, h) {
  //   const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name);
  //
  //   await logoutUserUseCase.execute(request.payload);
  //
  //   const response = h.response({
  //     status: 'success',
  //   });
  //   return response;
  // }
}

module.exports = AuthenticationsHandler;
