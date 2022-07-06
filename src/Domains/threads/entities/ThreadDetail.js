class ThreadDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.title = payload.title;
    this.body = payload.body;
    this.createdAt = payload.createdAt;
    this.username = payload.username;
    this.comments = payload.comments;
  }

  _verifyPayload({
    id, title, body, createdAt, username, comments,
  }) {
    if (!id || !title || !body || !createdAt || !username || !comments) {
      throw new Error('THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof body !== 'string'
      || typeof createdAt !== 'string' || typeof username !== 'string'
      || typeof comments !== 'object') {
      throw new Error('THREAD_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = ThreadDetail;
