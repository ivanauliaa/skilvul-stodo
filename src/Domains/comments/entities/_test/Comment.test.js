const Comment = require('../Comment');

describe('Comment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'comment-123',
      content: 'a comment',
    };

    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: true,
      content: 123,
      username: 'dicoding',
      created_at: 'createdAt',
    };

    expect(() => new Comment(payload)).toThrowError('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create Comment entities correctly', () => {
    const payload = {
      id: 'comment-123',
      content: 'a comment',
      username: 'dicoding',
      created_at: 'thread-123',
    };

    const comment = new Comment(payload);

    expect(comment).toBeInstanceOf(Comment);
    expect(comment.id).toEqual(payload.id);
    expect(comment.content).toEqual(payload.content);
    expect(comment.username).toEqual(payload.username);
    expect(comment.date).toEqual(payload.created_at);
  });
});
