const AuthenticationTokenManager = require('../../../../Applications/security/AuthenticationTokenManager');
const AuthenticationError = require('../../../../Commons/exceptions/AuthenticationError');

const jwtMiddleware = (container) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new AuthenticationError('unauthenticated');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new AuthenticationError('unauthenticated');
    }

    const jwt = container.getInstance(AuthenticationTokenManager.name);

    const payload = await jwt.decodePayload(token);
    req.authentication = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = jwtMiddleware;
