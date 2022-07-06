const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const GetThreadByIdUseCase = require('../GetThreadByIdUseCase');
const ThreadDetail = require('../../../../Domains/threads/entities/ThreadDetail');

describe('GetThreadByIdUseCase', () => {
  it('should orchestrating get thread by id correctly', async () => {
    const useCasePayload = {
      id: 'thread-123',
    };

    const expectedThreadDetail = new ThreadDetail({
      id: 'thread-123',
      title: 'thread title',
      body: 'thread body',
      createdAt: 'createdAt',
      username: 'username',
      comments: [],
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThreadDetail));

    const getThreadByIdUseCase = new GetThreadByIdUseCase({
      threadRepository: mockThreadRepository,
    });

    const threadDetail = await getThreadByIdUseCase.execute(useCasePayload);

    expect(threadDetail).toStrictEqual(expectedThreadDetail);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(useCasePayload.id);
  });
});
