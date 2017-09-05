export default (server) => {
  server.route({
    method: 'GET',
    path: '/ping',
    config: {auth: false},
    handler: (request, reply) => {
      reply('pong');
    },
  });
};
