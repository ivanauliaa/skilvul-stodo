class RegisterTodo {
  constructor(payload) {
    this._verifyPayload(payload);

    const { title, content, owner } = payload;

    this.title = title;
    this.content = content;
    this.owner = owner;
  }

  _verifyPayload({ title, content, owner }) {
    if (!title || !content || !owner) {
      throw new Error('REGISTER_TODO.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof content !== 'string' || typeof owner !== 'number') {
      throw new Error('REGISTER_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisterTodo;
