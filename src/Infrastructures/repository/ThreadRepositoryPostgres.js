const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(newThread) {
    const { title, body, owner } = newThread;
    const id = `thread-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();

    const stmt = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, createdAt],
    };

    const result = await this._pool.query(stmt);

    return new AddedThread({
      ...result.rows[0],
    });
  }

  async getThreadById(id) {
    const stmt = {
      text: `SELECT t.id, t.title, t.body, t.created_at AS date, u.username,
        (
          SELECT json_agg(
            json_build_object(
              'id', c.id, 'username', cu.username, 'date', c.created_at, 'content', CASE
              WHEN c.deleted_at IS NULL THEN
                c.content
              ELSE
                '**komentar telah dihapus**'
              END,
              'replies', (
                SELECT json_agg(
                  json_build_object(
                    'id', r.id, 'username', ru.username, 'date', r.created_at, 'content', CASE
                    WHEN r.deleted_at IS NULL THEN
                      r.content
                    ELSE
                      '**balasan telah dihapus**'
                    END
                  )
                  ORDER by r.created_at ASC
                )
                FROM replies r
                INNER JOIN users ru ON(r.owner = ru.id)
                WHERE r.comment_id = c.id
              )
            )
            ORDER BY c.created_at ASC
          )
          FROM comments c
          INNER JOIN users cu ON(c.owner = cu.id)
          WHERE c.thread_id = t.id
        ) as comments
      FROM threads t
      INNER JOIN users u ON(t.owner = u.id)
      WHERE t.id = $1`,
      values: [id],
    };

    const result = await this._pool.query(stmt);

    if (!result.rowCount) {
      throw new NotFoundError('thread tidak ditemukan');
    }

    return result.rows[0];
  }
}

module.exports = ThreadRepositoryPostgres;
