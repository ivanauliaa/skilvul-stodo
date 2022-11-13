class Todo {
    constructor(payload) {
        this._verifyPayload(payload);

        const {
            id,
            title,
            content,
            owner,
            deletedAt,
            createdAt,
            updatedAt,
        } = payload;

        this.id = id;
        this.title = !deletedAt ? title : '**todo telah dihapus**';
        this.content = !deletedAt ? content : '**todo telah dihapus**';
        this.owner = owner;
        this.createdAt = createdAt.toLocaleString();
        this.updatedAt = updatedAt.toLocaleString();
    }

    _verifyPayload({
      id,
      title,
      content,
      owner,
      createdAt,
      updatedAt,
    }) {
        if (!id || !title || !content || !owner || !createdAt || !updatedAt) {
            throw new Error('TODO.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id !== 'number' || typeof title !== 'string' || typeof content !== 'string'
            || typeof owner !== 'number' || typeof createdAt !== 'object' || typeof updatedAt !== 'object') {
            throw new Error('TODO.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = Todo;
