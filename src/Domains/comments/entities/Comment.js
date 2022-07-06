class Comment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.content = payload.content;
    this.owner = payload.owner;
    this.threadId = payload.thread_id;
    this.createdAt = payload.created_at;
    this.deletedAt = payload.deleted_at;
  }

  _verifyPayload({
    id, content, owner, thread_id: threadId, created_at: createdAt,
  }) {
    if (!id || !content || !owner || !threadId || !createdAt) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string'
      || typeof threadId !== 'string' || typeof createdAt !== 'string') {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Comment;
