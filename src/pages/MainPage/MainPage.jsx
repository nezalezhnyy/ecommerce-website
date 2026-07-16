import { supabase } from "../../supabase.js";
import { createContext, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel.jsx";
import SideBar from "../../components/SideBar/SideBar.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import styles from './MainPage.module.css'

export const MainQueryContext = createContext({});

function MainPage() {
    const DEFAULT_MAIN_QUERY = {
        minPrice: 0,
        maxPrice: 5000,
    };
    const [mainQuery, setMainQuery] = useSearchParams(DEFAULT_MAIN_QUERY);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const mainRef = useRef(null);

    useEffect(() => {
        async function getProducts() {

            const category = mainQuery.get('category') ?? null;
            const minPrice = mainQuery.get('minPrice') ?? null;
            const maxPrice = mainQuery.get('maxPrice') ?? null;
            const sortBy = mainQuery.get('sortBy') ?? null;

            let query = supabase.schema('webshop').from('products').select('*')

            if (category) query = query.eq('category', category);
            if (minPrice) query = query.gte('price', minPrice);
            if (maxPrice) query = query.lte('price', maxPrice);

            switch(sortBy) {
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

            const { data, error } = await query;

            setProducts(data);
            setCurrentPage(1);
        }
        getProducts()
    }, [mainQuery])

    return (
        <MainQueryContext.Provider value={{mainQuery, setMainQuery}}>
            <FilterPanel DEFAULT_MAIN_QUERY={DEFAULT_MAIN_QUERY}/>
            <div className={styles.root}>
                <div className="container">
                    <div className={styles.main} ref={mainRef}>
                        <div className={styles.sheet}>
                            <SideBar/>
                            <div className={styles.wrapper}>
                                <div className={styles.products}>
                                    {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                                        <ProductCard props={product} key={product.id}/>
                                    ))}
                                </div>
                                <Pagination itemsPerPage={itemsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainQueryContext.Provider>
    )
}

export default MainPage