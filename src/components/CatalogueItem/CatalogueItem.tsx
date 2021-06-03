import './CatalogueItem.scss'

export function CatalogueItem(props: CatalogueItemProps) {
    return (
        <div className={"col-lg-4 col-md-6 col-sm-12 col-xs-12"}>
            <div className={`card ${props.available ? "" : "disabled"}`}>
                <div className={"card-body"}>
                    <h2 className={"card-title"}>{props.name}</h2>
                    <p className={"card-text de aid"}>{props.description}</p>
                    <span className={"qty"}>
                        <p className={"card-text aid"}>Qty</p>
                        <h5 className={"card-text"}>{props.stock}</h5>
                    </span>
                </div>
            </div>
        </div>
    )

}

type CatalogueItemProps = {
    name: string;
    description: string;
    stock: number;
    available: boolean;
}
