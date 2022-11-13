class TodoId {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id } = payload;

        this.id = id;
    }

    _verifyPayload({ id }) {
        if (!id) {
            throw new Error('TODO_ID.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id !== 'number') {
            throw new Error('TODO_ID.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = TodoId;
