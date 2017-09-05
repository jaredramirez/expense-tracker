// @flow

export const getHeader = () => new Headers({
  'Content-Type': 'application/json',
});

export const getAuthHeader = (jwt: string) => {
  const headers = getHeader();
  headers.append('Authorization', `Bearer ${jwt}`);
  return headers;
};

export const toJSON = (object: any) => JSON.stringify(object);
