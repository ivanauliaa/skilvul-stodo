/* istanbul ignore file */

const { createContainer } = require('instances-container');

const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const Jwt = require('@hapi/jwt');
const jwt = require('jsonwebtoken');
const { Op: op, DataTypes } = require('sequelize');
const sequelize = require('./database/sequelize/sequelize');
// const pool = require('./database/postgres/pool');
const userModel = require('./database/sequelize/models/user');
const UserRepository = require('../Domains/users/UserRepository');
const UserRepositoryPostgres = require('./repository/UserRepositoryPostgres');

const todoModel = require('./database/sequelize/models/todo');
const TodoRepository = require('../Domains/todos/TodoRepository');
const TodoRepositoryPostgres = require('./repository/TodoRepositoryPostgres');

const AuthenticationRepository = require('../Domains/authentications/AuthenticationRepository');
const AuthenticationRepositoryPostgres = require('./repository/AuthenticationRepositoryPostgres');

const PasswordHash = require('../Applications/security/PasswordHash');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');

const AuthenticationTokenManager = require('../Applications/security/AuthenticationTokenManager');
const JwtTokenManager = require('./security/JwtTokenManager');

const AddUserUseCase = require('../Applications/use_case/AddUserUseCase');
const LoginUserUseCase = require('../Applications/use_case/LoginUserUseCase');
const LogoutUserUseCase = require('../Applications/use_case/LogoutUserUseCase');
const UpdateAuthenticationUseCase = require('../Applications/use_case/UpdateAuthenticationUseCase');
const DeleteAuthenticationUseCase = require('../Applications/use_case/DeleteAuthenticationUseCase');

const AddTodoUseCase = require('../Applications/use_case/AddTodoUseCase');
const GetTodosUseCase = require('../Applications/use_case/GetTodosUseCase');
const GetTodoByIdUseCase = require('../Applications/use_case/GetTodoByIdUseCase');
const UpdateTodoByIdUseCase = require('../Applications/use_case/UpdateTodoByIdUseCase');
const DeleteTodoByIdUseCase = require('../Applications/use_case/DeleteTodoByIdUseCase');

const HelloUseCase = require('../Applications/use_case/HelloUseCase');

const container = createContainer();

container.register([
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: jwt,
        },
      ],
    },
  },
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: userModel(sequelize, DataTypes),
        },
      ],
    },
  },
  {
    key: TodoRepository.name,
    Class: TodoRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: todoModel(sequelize, DataTypes),
        },
      ],
    },
  },
]);

container.register([
  {
    key: HelloUseCase.name,
    Class: HelloUseCase,
  },
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        // {
        //   name: 'authenticationRepository',
        //   internal: AuthenticationRepository.name,
        // },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: AddTodoUseCase.name,
    Class: AddTodoUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'todoRepository',
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: GetTodosUseCase.name,
    Class: GetTodosUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'todoRepository',
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: GetTodoByIdUseCase.name,
    Class: GetTodoByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'todoRepository',
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: UpdateTodoByIdUseCase.name,
    Class: UpdateTodoByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'todoRepository',
          internal: TodoRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteTodoByIdUseCase.name,
    Class: DeleteTodoByIdUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'todoRepository',
          internal: TodoRepository.name,
        },
      ],
    },
  },
//   {
//     key: UserRepository.name,
//     Class: UserRepositoryPostgres,
//     parameter: {
//       dependencies: [
//         {
//           concrete: pool,
//         },
//         {
//           concrete: nanoid,
//         },
//       ],
//     },
//   },
//   {
//     key: AuthenticationRepository.name,
//     Class: AuthenticationRepositoryPostgres,
//     parameter: {
//       dependencies: [
//         {
//           concrete: pool,
//         },
//       ],
//     },
//   },
//   {
//     key: PasswordHash.name,
//     Class: BcryptPasswordHash,
//     parameter: {
//       dependencies: [
//         {
//           concrete: bcrypt,
//         },
//       ],
//     },
//   },
//   {
//     key: AuthenticationTokenManager.name,
//     Class: JwtTokenManager,
//     parameter: {
//       dependencies: [
//         {
//           concrete: Jwt.token,
//         },
//       ],
//     },
//   },
// ]);
//
// container.register([
//   {
//     key: AddUserUseCase.name,
//     Class: AddUserUseCase,
//     parameter: {
//       injectType: 'destructuring',
//       dependencies: [
//         {
//           name: 'userRepository',
//           internal: UserRepository.name,
//         },
//         {
//           name: 'passwordHash',
//           internal: PasswordHash.name,
//         },
//       ],
//     },
//   },
//   {
//     key: LoginUserUseCase.name,
//     Class: LoginUserUseCase,
//     parameter: {
//       injectType: 'destructuring',
//       dependencies: [
//         {
//           name: 'userRepository',
//           internal: UserRepository.name,
//         },
//         {
//           name: 'authenticationRepository',
//           internal: AuthenticationRepository.name,
//         },
//         {
//           name: 'authenticationTokenManager',
//           internal: AuthenticationTokenManager.name,
//         },
//         {
//           name: 'passwordHash',
//           internal: PasswordHash.name,
//         },
//       ],
//     },
//   },
//   {
//     key: LogoutUserUseCase.name,
//     Class: LogoutUserUseCase,
//     parameter: {
//       injectType: 'destructuring',
//       dependencies: [
//         {
//           name: 'authenticationRepository',
//           internal: AuthenticationRepository.name,
//         },
//       ],
//     },
//   },
//   {
//     key: DeleteAuthenticationUseCase.name,
//     Class: DeleteAuthenticationUseCase,
//     parameter: {
//       injectType: 'destructuring',
//       dependencies: [
//         {
//           name: 'authenticationRepository',
//           internal: AuthenticationRepository.name,
//         },
//       ],
//     },
//   },
//   {
//     key: UpdateAuthenticationUseCase.name,
//     Class: UpdateAuthenticationUseCase,
//     parameter: {
//       injectType: 'destructuring',
//       dependencies: [
//         {
//           name: 'authenticationRepository',
//           internal: AuthenticationRepository.name,
//         },
//         {
//           name: 'authenticationTokenManager',
//           internal: AuthenticationTokenManager.name,
//         },
//       ],
//     },
//   },
]);

module.exports = container;
