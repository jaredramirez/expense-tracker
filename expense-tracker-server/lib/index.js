import Hapi from 'hapi';
import hapiMongo from 'hapi-mongodb';
import hapiAuthJwt from 'hapi-auth-jwt2';
import hapiAsyncHandler from 'hapi-async-handler';

import configAuth from './auth';
import configLogging from './logging';
import configHealthRoutes from './routes/health';
import configUsersRoutes from './routes/users';
import configExpensesRoutes from './routes/expenses';

const server = new Hapi.Server();
server.connection({port: 2000, routes: {cors: true}});

const plugins = [
  {
    register: hapiMongo,
    options: {
      url: 'mongodb://root:root@ds115411.mlab.com:15411/expense-tracker',
      settings: {
        poolSize: 10,
      },
      decorate: true,
    },
  },
  hapiAuthJwt,
  hapiAsyncHandler,
];

console.info('Connecting to Mongo instance...');
server.register(plugins, (mongoErr) => {
  if (mongoErr) {
    console.info('failed.');
    console.error(mongoErr);
    throw mongoErr;
  }
  console.info('success!');

  configAuth(server);
  configLogging(server);
  configHealthRoutes(server);
  configUsersRoutes(server);
  configExpensesRoutes(server);

  console.info(`Starting server at '${server.info.uri}'...`);
  server.start((hapiErr) => {
    if (hapiErr) {
      console.info('failed.');
      console.error(hapiErr);
      throw hapiErr;
    }
    console.info('success!');
  });
});
