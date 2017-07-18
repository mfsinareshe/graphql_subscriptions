import express from 'express';
import schema from './data/schema';
import resolver from './data/resolver';


import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';


import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

const GRAPHQL_PORT = 8090;
const graphQLServer = express();

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver,
});

addMockFunctionsToSchema({
  schema: executableSchema,
  preserveResolvers: true,
});



graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));
const graphqlHTTP = require('express-graphql');
graphQLServer.use("/graphql", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


graphQLServer.use('/graphql', bodyParser.json(), graphqlHTTP({
  schema: executableSchema,
  context: {}, //at least(!) an empty object
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));


import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

const WS_PORT = 9001;

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening


const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: websocketServer,
    path:'/subscriptions',
  },
);

websocketServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));