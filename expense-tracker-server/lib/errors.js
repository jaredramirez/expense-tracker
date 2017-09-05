import Boom from 'boom';

export const errors = {
  internal: Boom.internal('internal server error.'),
  badRequest: message => Boom.badRequest(message),
  conflict: message => Boom.conflict(message),
  unauthorized: message => Boom.unauthorized(message),
  notFound: Boom.notFound('not found.'),
};

export const handleError = ({code, message = ''}) => {
  if (code === 400) {
    return errors.badRequest(message);
  } else if (code === 404) {
    return errors.notFound;
  } else if (code === 401) {
    return errors.unauthorized(message);
  } else if (code === 11000) {
    return errors.conflict('email already in use.');
  }
  return errors.internal;
};
