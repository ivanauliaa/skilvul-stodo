const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const deleteComment = new DeleteComment(useCasePayload);

    await this._threadRepository.getThreadById(deleteComment.threadId);
    await this._commentRepository.verifyCommentOwner(deleteComment.commentId, deleteComment.owner);
    await this._commentRepository.deleteComment(deleteComment.commentId);
  }
}

module.exports = AddCommentUseCase;
