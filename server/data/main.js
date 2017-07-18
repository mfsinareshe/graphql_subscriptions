import { schema } from './schema'
import { subscriptionManager } from './subscriptions'
import { createApolloServer } from 'meteor/apollo';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const WS_PORT = process.env.WS_PORT || 8088;

createApolloServer({
  schema: schema,
});

const httpServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});
httpServer.listen(WS_PORT, () => console.log(
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));
const server = new SubscriptionServer({ subscriptionManager }, httpServer);