import React, {
    Component
} from 'react';
import client from './ApolloClient'

import {
    gql,
    graphql
} from 'react-apollo';
import {
    ApolloProvider
} from 'react-apollo';


const MyComponent = ({
    data: {
        loading,error,items
    }
}) => {
     if (loading) {
        return <p > Loading... < /p>;
    }
    if (error) {
        return <p > {
            error.message
        } < /p>;
    }
    return <ul > 
        {JSON.stringify(items)}
     </ul>;
};


const UserAccountQuery = gql`
   query UserAccountQuery {
     items {
          service_name
          cname
          creation_date
          type
          organization_guid
          account_id
          ctype
          provider
          scope
          modification_date
          name
          resource_id
          region
          service_instance
          family
          crn
          
     }
   }
 `;

const UserAccountSubsQuery = gql`
 subscription{
  feedUpdated {
    service_name
    cname
    creation_date
    type
    organization_guid
    account_id
    ctype
    provider
    scope
    modification_date
    name
    resource_id
    region
    service_instance
    family
    crn
  }
}`;

const MyComponentWithData = graphql(UserAccountQuery,
{
    name: 'feed',
    props: props => {
        return {
            feedUpdated: params => {
                return props.feed.subscribeToMore({
                    document: UserAccountSubsQuery,
                    updateQuery: (prev, {subscriptionData}) => {
                        if (!subscriptionData.data) {
                            return prev;
                        }
                        const newFeedItem = subscriptionData.data.feedUpdated;
                        return Object.assign({}, prev, {
                            data: {
                                feed: [newFeedItem, ...prev.feedUpdated]
                            }
                        });
                    }
                });
            }
        };
    },
}
)(MyComponent);




class App extends Component {
    render() {
        return ( <
            ApolloProvider client = {
                client
            } >
            <
            MyComponentWithData / >
            <
            /ApolloProvider>

        );
    }
}

export default App;
