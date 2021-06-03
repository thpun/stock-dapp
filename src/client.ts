// external imports
import {ApolloClient, ApolloLink, InMemoryCache, Observable} from '@apollo/client';
import {graphql} from 'graphql'
import {print} from 'graphql/language/printer';
// local imports
import schema from './schema'

const blockchainLink = new ApolloLink(
    operation => new Observable(observer => {
        graphql(schema, print(operation.query), null, null, operation.variables).then(
            result => {
                observer.next(result);
                observer.complete();
            }
        )
    })
);

export default new ApolloClient({
    link: blockchainLink,
    cache: new InMemoryCache(),
})
