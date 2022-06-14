/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-123',
    title = 'thread title',
    body = 'thread body',
    owner = 'user-123',
  }) {
    const stmt = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
      values: [id, title, body, owner],
    };

    await pool.query(stmt);
  },
  async findThreadById(id) {
    const stmt = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(stmt);
    return result.rows;
  },
  async cleanTable() {
    const stmt = 'TRUNCATE threads';
    await pool.query(stmt);
  },
};

module.exports = ThreadsTableTestHelper;
