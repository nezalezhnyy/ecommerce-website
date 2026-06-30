import { query, where, collection, orderBy } from "firebase/firestore";
import { db, fetchItems } from "../../firebaseClient.js";
import { createContext, useEffect, useState } from "react";

import FilterPanel from "../FilterPanel/FilterPanel.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";

import styles from './MainPage.module.css'

export const MainQueryContext = createContext({});

function MainPage() {
    const [mainQuery, setMainQuery] = useState({});
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState([0, 20]);

    useEffect(() => {
        async function getProducts() {
            const constraints = [];

            if (mainQuery.category) constraints.push(where('category', '==', mainQuery.category));
            
            switch(mainQuery.sortBy) {
                case "by rating":
                    constraints.push(orderBy('rating'));
                    break;
                case "new":
                    constraints.push(orderBy('meta.createdAt', 'desc'));
                    break;
                case "price: low to high":
                    constraints.push(orderBy('price'));
                    break;
                case "price: high to low":
                    constraints.push(orderBy('price', 'desc'));
                    break;
            }
            
            const q = query(collection(db, "products"), ...constraints);

            try {
                const items = await fetchItems(q);
                setProducts(items);
            } catch (err) {
                console.error("query error:", err);
            }
        }
        getProducts()
    }, [mainQuery])

    return (
        <div className={styles.root}>
            <div className="container">
                <div className={styles.main}>
                    <MainQueryContext.Provider value={{mainQuery, setMainQuery}}>
                        <FilterPanel/>
                        <div className={styles.sheet}>
                            <SideBar/>
                            <div className={styles.products}>
                                {products.slice(page[0], page[1]).map((product) => (
                                    <ProductCard props={product} key={product.id}/>
                                ))}
                            </div>
                        </div>
                    </MainQueryContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default MainPage