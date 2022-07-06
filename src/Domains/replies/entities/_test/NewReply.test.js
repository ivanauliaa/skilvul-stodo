const NewReply = require('../NewReply');

describe('NewReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      content: 'a reply',
      commentId: 'thread-123',
    };

    expect(() => new NewReply(payload)).toThrowError('NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      content: true,
      owner: 'user-123',
      commentId: 123,
      threadId: 456,
    };

    expect(() => new NewReply(payload)).toThrowError('NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create NewReply entities correctly', () => {
    const payload = {
      content: 'a reply',
      owner: 'user-123',
      commentId: 'comment-123',
      threadId: 'thread-123',
    };

    const newComment = new NewReply(payload);

    expect(newComment).toBeInstanceOf(NewReply);
    expect(newComment.content).toEqual(payload.content);
    expect(newComment.owner).toEqual(payload.owner);
    expect(newComment.commentId).toEqual(payload.commentId);
  });
});
