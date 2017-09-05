import {
  authenticate,
  create,
  createAuthorized,
  readAll,
  readById,
  replaceById,
  deleteById,
} from '../handlers/users';

export default (server) => {
  server.route({
    method: 'POST',
    path: '/authenticate',
    config: {
      auth: false,
      payload: {
        parse: true,
      },
    },
    handler: authenticate,
  });

  server.route({
    method: 'POST',
    path: '/users',
    config: {auth: false},
    handler: create,
  });

  server.route({
    method: 'POST',
    path: '/users/authorized',
    config: {auth: 'jwt'},
    handler: createAuthorized,
  });

  server.route({
    method: 'GET',
    path: '/users',
    config: {auth: 'jwt'},
    handler: readAll,
  });

  server.route({
    method: 'GET',
    path: '/users/{userId}',
    config: {auth: 'jwt'},
    handler: readById,
  });

  server.route({
    method: 'PUT',
    path: '/users/{userId}',
    config: {auth: 'jwt'},
    handler: replaceById,
  });

  server.route({
    method: 'DELETE',
    path: '/users/{userId}',
    config: {auth: 'jwt'},
    handler: deleteById,
  });
};
