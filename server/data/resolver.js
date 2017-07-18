import RESTData from './connector.js';
import Schema from './schema';
import { subscriptionManager, pubsub } from './subscriptions';
import { withFilter } from 'graphql-subscriptions';

const FEED_UPDATED = 'feedUpdated';

const resolver = {
    Query: {
        items(obj, args, context, info) { 
          return  RESTData.getData().then((res) => {
            return JSON.parse(res).items;
          });
        }
    },
    Item:{
        doc(obj, args, context, info) { 
            return obj.doc;
        }
    },
    Docs:{
        available_domains(obj, args, context, info) { 
            return obj.available_domains;
        },
        routes(obj, args, context, info) { 
            return obj.routes;
        },
        services(obj, args, context, info) { 
            return obj.services;
        },
        docker_credentials_json(obj, args, context, info) { 
            return obj.docker_credentials_json;
        }
        
    },
    Routes:{
        domain(obj, args, context, info) { 
            return obj.routes.domain;
        },
    },
    Services:{
        service_plan(obj, args, context, info) { 
            return obj.services.service_plan;
        },
        last_operation(obj, args, context, info) { 
            return obj.last_operation;
        },
    },
    ServicePlan:{
        service(obj, args, context, info) { 
            return obj.service;
        }
    },
    Mutation: {
        updatedItems: (root,feed) => {
               console.log(JSON.stringify(feed));
               pubsub.publish(FEED_UPDATED, { feed });
        },
    },
     Subscription: {
        feedUpdated(obj, args, context, info){
          subscribe: () => pubsub.asyncIterator(FEED_UPDATED)
        },
      },
};

export default resolver;