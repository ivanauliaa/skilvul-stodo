const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai'),
  'REGISTER_USER.USERNAME_LIMIT_CHAR':
    new InvariantError('tidak dapat membuat user baru karena karatker username melebihi batas limit'),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER':
    new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang'),
  'REGISTER_TODO.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat todo baru karena properti yang dibutuhkan tidak ada'),
  'REGISTER_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat todo baru karena tipe data tidak sesuai'),
  'TODO_OWNER.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat entity todo owner karena properti yang dibutuhkan tidak ada'),
  'TODO_OWNER.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat entity todo owner karena tipe data tidak sesuai'),
  'TODO_ID.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat entity todo id karena properti yang dibutuhkan tidak ada'),
  'TODO_ID.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat entity todo id karena tipe data tidak sesuai'),
  'UPDATE_TODO.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat entity update todo karena properti yang dibutuhkan tidak ada'),
  'UPDATE_TODO.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat entity update todo karena tipe data tidak sesuai'),
  'NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat entity new auth karena properti yang dibutuhkan tidak ada'),
  'NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat entity new auth karena tipe data tidak sesuai'),
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('harus mengirimkan username dan password'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('username dan password harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'UPDATE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),
  'UPDATE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),
  'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat thread karena properti yang dibutuhkan tidak ada'),
  'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat thread karena tipe data tidak sesuai'),
  'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat comment karena properti yang dibutuhkan tidak ada'),
  'NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat comment karena tipe data tidak sesuai'),
  'NEW_REPLY.NOT_CONTAIN_NEEDED_PROPERTY':
    new InvariantError('tidak dapat membuat reply karena properti yang dibutuhkan tidak ada'),
  'NEW_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('tidak dapat membuat reply karena tipe data tidak sesuai'),
};

module.exports = DomainErrorTranslator;
