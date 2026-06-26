import { useState } from "react";
import ProductCard from "./ProductCard.jsx";

function ProductsSheet({products}) {
    const [page, setPage] = useState([0, 20]);
    console.log(products)

    return(
        <div className="products-sheet">
            {products.slice(page[0], page[1]).map((product) => (
                <ProductCard props={product} key={product.id}/>
            ))}
        </div>
    )
}

export default ProductsSheet