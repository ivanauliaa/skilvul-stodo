class TodoOwner {
    constructor(payload) {
        this._verifyPayload(payload);

        const { owner } = payload;

        this.owner = owner;
    }

    _verifyPayload({ owner }) {
        if (!owner) {
            throw new Error('TODO_OWNER.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof owner !== 'number') {
            throw new Error('TODO_OWNER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = TodoOwner;
