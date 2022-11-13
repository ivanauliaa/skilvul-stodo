const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');
const HelloUseCase = require('../../../../Applications/use_case/HelloUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.helloHandler = this.helloHandler.bind(this);
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async helloHandler(req, res) {
    const helloUseCase = this._container.getInstance(HelloUseCase.name);
    const message = await helloUseCase.execute();

    res.status(200).json(message);
  }

  async postUserHandler(req, res, next) {
    try {
      const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
      const addedUser = await addUserUseCase.execute(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          addedUser,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UsersHandler;
