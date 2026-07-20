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
    const [mainQuery, setMainQuery] = useSearchParams();
    const [products, setProducts] = useState([]);

    const itemsPerPage = 20;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pageQuery = Number(mainQuery.get('page')) || 1;

    const mainRef = useRef(null);

    useEffect(() => {
        async function getProducts() {
            const category = mainQuery.get('category') ?? null;
            const priceRange = mainQuery.get('priceRange')?.split(" - ").map(Number) ?? null;
            const sortBy = mainQuery.get('sortBy') ?? null;

            let query = supabase.schema('webshop').from('products').select('*')

            if (category) query = query.eq('category', category);
            if (priceRange) query = query.gte('price', priceRange[0]).lte('price', priceRange[1])

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

            console.log(priceRange)

            const { data, error } = await query;

            setProducts(data);
        }
        getProducts()
    }, [mainQuery])

    function handlePageChange(page) {
        if (page !== pageQuery) {
            setMainQuery(prev => {
                const next = new URLSearchParams(prev);
                if (page === 1) next.delete('page')
                else next.set('page', page);

                return next;
            }, { replace: true })
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <MainQueryContext.Provider value={{mainQuery, setMainQuery}}>
            <FilterPanel/>
            <div className={styles.root}>
                <div className="container">
                    <div className={styles.main} ref={mainRef}>
                        <div className={styles.sheet}>
                            <SideBar/>
                            <div className={styles.wrapper}>
                                <div className={styles.products}>
                                    {products.slice((pageQuery - 1) * itemsPerPage, pageQuery * itemsPerPage).map((product) => (
                                        <ProductCard props={product} key={product.id}/>
                                    ))}
                                </div>
                                <Pagination pageQuery={pageQuery} itemsPerPage={itemsPerPage} totalPages={totalPages} onChange={handlePageChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainQueryContext.Provider>
    )
}

export default MainPage