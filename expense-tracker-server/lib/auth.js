import {secret} from './config';

const validateAccess = access => access === 0 || access === 1 || access === 2;

const validate = ({id, access}, {app, path, params}, callback) => {
  if (!id || !validateAccess(access)) {
    return callback(null, false);
  }
  app.authPayload = {id, access};

  const expenseIsOnPath = (/(expense)/g).test(path);

  if (access === 2) {
    return callback(null, true);
  } else if (access === 1 && ((expenseIsOnPath && id === params.userId) || !expenseIsOnPath)) {
    return callback(null, true);
  } else if (access === 0 && id === params.userId) {
    return callback(null, true);
  }

  return callback(null, false);
};

const configAuth = (server) => {
  server.auth.strategy('jwt', 'jwt', {
    key: secret,
    validateFunc: validate,
    verifyOptions: {algorithms: ['HS256']},
    tokenType: 'Bearer',
  });
  server.auth.default('jwt');
};

export default configAuth;
