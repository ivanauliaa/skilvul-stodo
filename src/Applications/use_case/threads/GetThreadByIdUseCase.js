const ThreadId = require('../../../Domains/threads/entities/ThreadId');

class GetThreadByIdUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const threadId = new ThreadId(useCasePayload);

    return this._threadRepository.getThreadById(threadId.id);
  }
}

module.exports = GetThreadByIdUseCase;
