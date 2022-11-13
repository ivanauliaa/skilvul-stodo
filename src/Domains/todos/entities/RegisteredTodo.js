class RegisteredTodo {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title } = payload;

    this.id = id;
    this.title = title;
  }

  _verifyPayload({ id, title }) {
    if (!id || !title) {
      throw new Error('REGISTERED_TODO.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'number' || typeof title !== 'string') {
      throw new Error('REGISTERED_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisteredTodo;
