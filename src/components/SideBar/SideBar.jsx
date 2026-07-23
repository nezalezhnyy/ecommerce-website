import { supabase } from "../../supabase.js";
import { useState, useEffect, useContext } from "react";
import { MainQueryContext } from "../../pages/MainPage/MainPage.jsx";
import { IconX } from '@tabler/icons-react';
import DoubleSlider from "../DoubleSlider/DoubleSlider.jsx";
import styles from './SideBar.module.css'
import Button from "../Button/Button.jsx";

function SideBar({ isDesktop, sideBarShow, setSideBarShow }) {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);
    const [categories, setCategories] = useState([]);
    const [biggestPrice, setBiggestPrice] = useState();

    const priceRange = mainQuery.get("priceRange")?.split(" - ").map(Number) ?? [0, 37000];

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
            next.delete('page');

            return next;
        }, { replace: true });
    }

    function handleSliderChange(minPrice, maxPrice) {
        setMainQuery(prev => {
            const next = new URLSearchParams(prev);
            next.set('priceRange', [minPrice, maxPrice].join(" - "));
            next.delete('page');

            return next;
        }, { replace: true })
    }

    return (
        <>
            {(isDesktop || sideBarShow) && 
                <div className={styles.root}>
                    <div className={styles.title}>
                        {!isDesktop && 
                            <Button variant="icon" onClick={() => setSideBarShow(prev => !prev)}>
                                <IconX stroke={1.4}/>
                            </Button>
                        }
                        <h2>Filters</h2>
                    </div>
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
                    <DoubleSlider leftValue={priceRange[0]} rightValue={priceRange[1]} biggestValue={biggestPrice} onChange={handleSliderChange}/>
                </div>
            }
        </>
    )
}

export default SideBar