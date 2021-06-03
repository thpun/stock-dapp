import {makeExecutableSchema} from '@graphql-tools/schema';
import {web3, InventoryABI} from './contracts';

const schema = `
    type Item {
        id: ID!
        name: String!
        description: String!
        stock: Int!
        available: Boolean!
    }
    
    type Catalogue {
        allItems: [Item!]!
    }
    
    schema {
        query: Catalogue
    }
`;

const resolvers = {
    Item: {
        id: (item: any) => item['id'],
        name: (item: any) => item['name'],
        description: (item: any) => item['description'],
        stock: (item: any) => item['stock'],
        available: (item: any) => item['available']
    },
    Catalogue: {
        allItems: async () => {
            // @ts-ignore
            const inventory = new web3.eth.Contract(InventoryABI, process.env.REACT_APP_INVENTORY_CONTRACT);

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
