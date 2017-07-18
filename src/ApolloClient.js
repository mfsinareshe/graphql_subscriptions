import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient('ws://localhost:9001/subscriptions', {
  reconnect: true,
});

const networkInterface = createNetworkInterface({   
    uri: 'http://localhost:8090/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}]);

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);  

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
})

export default client;	