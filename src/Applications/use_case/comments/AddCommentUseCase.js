const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const NewComment = require('../../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(payload) {
    const newComment = new NewComment(payload);

    await this._threadRepository.getThreadById(newComment.threadId);
    const commentId = await this._commentRepository.addComment(newComment);

    return new AddedComment({
      id: commentId,
      content: newComment.content,
      owner: newComment.owner,
    });
  }
}

module.exports = AddCommentUseCase;
