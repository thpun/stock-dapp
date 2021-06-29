import {gql, useQuery} from "@apollo/client";
import CatalogueItem from "../CatalogueItem";
import {useEffect} from "react";
import {InventoryInstance} from "../../contracts";

const GET_CATALOGUE = gql`
    query GetCatalogue {
        allItems {
            id
            name
            description
            stock
            available
            updateTime
        }
    }
`;

export function Catalogue() {
    const {loading, error, data, refetch} = useQuery(GET_CATALOGUE);

    useEffect(() => {
        let subscriber = InventoryInstance.events.Updated().on('data', () => {
            refetch()
        });

        return () => {
            subscriber.unsubscribe((err: { message: any; }) => {
                if (err) {
                    console.error(err.message);
                }
            })
        };
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! ${error.message}`</p>;

    return (
        <div className={"row"}>{data.allItems.map((item: any) => (
            <CatalogueItem key={item.id} {...item} />
        ))}</div>
    )
}

