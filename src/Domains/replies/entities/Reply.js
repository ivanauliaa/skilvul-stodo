class Reply {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.content = payload.content;
    this.owner = payload.owner;
    this.commentId = payload.comment_id;
    this.createdAt = payload.created_at;
    this.deletedAt = payload.deleted_at;
  }

  _verifyPayload({
    id, content, owner, comment_id: commentId, created_at: createdAt,
  }) {
    if (!id || !content || !owner || !commentId || !createdAt) {
      throw new Error('REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof content !== 'string' || typeof owner !== 'string'
      || typeof commentId !== 'string' || typeof createdAt !== 'string') {
      throw new Error('REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Reply;
