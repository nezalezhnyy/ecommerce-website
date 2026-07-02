import { supabase } from "../../supabase.js";

import { createContext, useEffect, useState } from "react";

import FilterPanel from "../FilterPanel/FilterPanel.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import ProductCard from "../ProductCard/ProductCard.jsx";

import styles from './MainPage.module.css'

export const MainQueryContext = createContext({});

function MainPage() {
    const [mainQuery, setMainQuery] = useState({
        category: undefined,
        priceRange: undefined,
        "thumb1": 0, 
        "thumb2": 100
    });
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState([0, 20]);

    useEffect(() => {
        async function getProducts() {

            let query = supabase.schema('webshop').from('products').select('*')

            if (mainQuery.category) query = query.eq('category', mainQuery.category)
            if (mainQuery.priceRange) query = query
                .gte('price', mainQuery.priceRange[0])
                .lte('price', mainQuery.priceRange[1])

            switch(mainQuery.sortBy) {
                case "by rating":
                    query = query.order('rating', { ascending: false });
                    break;
                case "new":
                    query = query.order('created_at', { ascending: false });
                    break;
                case "price: low to high":
                    query = query.order('price');
                    break;
                case "price: high to low":
                    query = query.order('price', { ascending: false });
                    break;
            }

            const { data, error } = await query
            setProducts(data)
            
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