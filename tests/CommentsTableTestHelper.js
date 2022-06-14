/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    content = 'thread title',
    owner = 'user-123',
    threadId = 'thread-123',
  }) {
    const stmt = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4)',
      values: [id, content, owner, threadId],
    };

    await pool.query(stmt);
  },
  async findCommentById(id) {
    const stmt = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(stmt);
    return result.rows;
  },
  async cleanTable() {
    const stmt = 'TRUNCATE comments';
    await pool.query(stmt);
  },
};

module.exports = CommentsTableTestHelper;
