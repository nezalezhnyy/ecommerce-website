import { supabase } from "../../supabase.js";
import { useState, useEffect, useContext } from "react";
import { MainQueryContext } from "../../pages/MainPage/MainPage.jsx";
import DoubleSlider from "../DoubleSlider/DoubleSlider.jsx";
import styles from './SideBar.module.css'

function SideBar({ setCurrentPage }) {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);
    const [categories, setCategories] = useState([]);
    const [biggestPrice, setBiggestPrice] = useState();

    const minPrice = Number(mainQuery.get("minPrice"));
    const maxPrice = Number(mainQuery.get("maxPrice"));

    useEffect(() => {
        async function loadCategories() {
            const { data, error } = await supabase.rpc('get_categories');

            setCategories(data.map(item => item.category))
        }

        async function findBiggestPrice() {
            const { data, error } = await supabase
                .schema('webshop')
                .from('products')
                .select('price')
                .order('price', { ascending: false })
                .limit(1)
            
            const price = data[0].price

            setBiggestPrice(price);
        }
        loadCategories()
        findBiggestPrice();
    }, [])

    function handleCategoryChange(value) {
        setMainQuery(prev => {
            const next = new URLSearchParams(prev);
            if (next.get('category') === value) {
                next.delete("category");
            } else {
                next.set("category", value);
            }
            return next;
        }, { replace: true });
    }

    function handleSliderChange(minPrice, maxPrice) {
        setMainQuery(prev => {
            const next = new URLSearchParams(prev);
            next.set('minPrice', minPrice);
            next.set('maxPrice', maxPrice);

            return next;
        }, { replace: true })
    }

    return (
        <div className={styles.root}>
            <h4>Categories</h4>
            <div className={styles.categories}>

                {categories.map((category) => (
                    <label className={styles.category} key={category}>
                        <input  type="radio"
                                name="category"
                                value={category} 
                                checked={mainQuery.get('category') === category} 
                                onChange={() => {}} 
                                onClick={() => handleCategoryChange(category)}
                        />
                        <span className={styles.custom__radio}></span>
                        <span>{category}</span>
                    </label>
                ))}

            </div>
            <h4>Price</h4>
            <DoubleSlider leftValue={minPrice} rightValue={maxPrice} biggestValue={biggestPrice} onChange={handleSliderChange}/>
        </div>
    )
}

export default SideBar