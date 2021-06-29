import {makeExecutableSchema} from '@graphql-tools/schema';
import {InventoryInstance} from './contracts';
import {GraphQLTimestamp} from "./scalars/Timestamp";

const schema = `
    scalar Timestamp

    type Item {
        id: ID!
        name: String!
        category: String!
        description: String!
        stock: Int!
        available: Boolean!
        updateTime: Timestamp!
    }
    
    type Catalogue {
        allItems: [Item!]!
    }
    
    schema {
        query: Catalogue
    }
`;

const resolvers = {
    Timestamp: GraphQLTimestamp,
    Item: {
        id: (item: any) => item['id'],
        name: (item: any) => item['name'],
        category: (item: any) => item['category'],
        description: (item: any) => item['description'],
        stock: (item: any) => item['stock'],
        available: (item: any) => item['available'],
        updateTime: (item: any) => parseInt(item['updateTime'])
    },
    Catalogue: {
        allItems: async () => {
            // @ts-ignore
            const inventory = InventoryInstance;

            const items = [];
            for (let i = 0; i < await inventory.methods.indexCount().call(); i++) {
                let id = await inventory.methods.indexes(i).call();
                items.push(await inventory.methods.catalogue(id).call());
            }
            return items;
        }
    }
};

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers
})
