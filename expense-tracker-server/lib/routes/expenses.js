import {
  createByUser,
  readAllByUser,
  readByUserAndId,
  replaceByUserAndId,
  deleteByUserAndId,
} from '../handlers/expenses';

export default (server) => {
  server.route({
    method: 'POST',
    path: '/users/{userId}/expenses',
    config: {auth: 'jwt'},
    handler: createByUser,
  });

  server.route({
    method: 'GET',
    path: '/users/{userId}/expenses',
    config: {auth: 'jwt'},
    handler: readAllByUser,
  });

  server.route({
    method: 'GET',
    path: '/users/{userId}/expenses/{expenseId}',
    config: {auth: 'jwt'},
    handler: readByUserAndId,
  });

  server.route({
    method: 'PUT',
    path: '/users/{userId}/expenses/{expenseId}',
    config: {auth: 'jwt'},
    handler: replaceByUserAndId,
  });

  server.route({
    method: 'DELETE',
    path: '/users/{userId}/expenses/{expenseId}',
    config: {auth: 'jwt'},
    handler: deleteByUserAndId,
  });
};
