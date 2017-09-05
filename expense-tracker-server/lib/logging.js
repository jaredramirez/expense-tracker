export default (server) => {
  server.on('response', (request) => {
    console.info(`${request.info.remoteAddress}: ${request.method.toUpperCase()} ${request.url.path} --> ${request.response.statusCode}`);
  });
};
