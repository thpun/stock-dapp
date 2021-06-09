import {gql, useQuery} from "@apollo/client";
import CatalogueItem from "../CatalogueItem";

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
    const {loading, error, data} = useQuery(GET_CATALOGUE);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error! ${error.message}`</p>;

    console.log(data);
    return (
        <div className={"row"}>{data.allItems.map((item: any) => (
            <CatalogueItem key={item.id} {...item} />
        ))}</div>
    )
}

