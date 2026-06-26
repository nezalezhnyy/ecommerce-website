import { query, where, collection } from "firebase/firestore";
import { db, fetchItems } from "./firebaseClient.js";
import SideBar from "./SideBar.jsx";
import ProductsSheet from "./ProductsSheet.jsx";
import { createContext, useEffect, useState } from "react";

export const MainQueryContext = createContext({});

function MainPage() {
    const [mainQuery, setMainQuery] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const constraints = [];

            if (mainQuery.category) constraints.push(where('category', '==', mainQuery.category));

            const q = query(collection(db, "products"), ...constraints);

            const items = await fetchItems(q);

            setProducts(items);
        }
        getProducts()
    }, [mainQuery])

    return (
        <div className="main">
            <div className="container">
                <div className="main__container">
                    <MainQueryContext.Provider value={{mainQuery, setMainQuery}}>
                        <SideBar/>
                    </MainQueryContext.Provider>
                    <ProductsSheet products={products} />
                </div>
            </div>
        </div>
    )
}

export default MainPage