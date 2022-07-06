const ThreadDetail = require('../ThreadDetail');

describe('ThreadDetail entitites', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'thread-123',
    };

    expect(() => new ThreadDetail(payload)).toThrowError('THREAD_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'thread-123',
      title: 123,
      body: true,
      createdAt: 456,
      username: true,
      comments: 789,
    };

    expect(() => new ThreadDetail(payload)).toThrowError('THREAD_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create ThreadDetail entities correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'thread title',
      body: 'thread body',
      createdAt: 'createdAt',
      username: 'username',
      comments: [],
    };

    const threadDetail = new ThreadDetail(payload);

    expect(threadDetail).toBeInstanceOf(ThreadDetail);
    expect(threadDetail.id).toEqual(payload.id);
    expect(threadDetail.title).toEqual(payload.title);
    expect(threadDetail.body).toEqual(payload.body);
    expect(threadDetail.createdAt).toEqual(payload.createdAt);
    expect(threadDetail.username).toEqual(payload.username);
    expect(threadDetail.comments).toStrictEqual(payload.comments);
  });
});
