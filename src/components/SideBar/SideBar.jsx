import { supabase } from "../../supabase.js";

import { useState, useEffect, useContext } from "react";

import { MainQueryContext } from "../../pages/MainPage/MainPage.jsx";

import DoubleSlider from "../DoubleSlider/DoubleSlider.jsx";

import styles from './SideBar.module.css'

function SideBar({ setCurrentPage }) {

    const {mainQuery, setMainQuery} = useContext(MainQueryContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadCategories() {
            const { data, error } = await supabase.rpc('get_categories');

            setCategories(data.map(item => item.category))
        }
        loadCategories()
    }, [])

    function handleCategoryChange(category) {
        setMainQuery((q) => q = {...q, category: category})
    }

    function handleSliderChange(value) {
        setMainQuery((q) => ({ ...q, priceRange: value}))
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
                                checked={mainQuery.category === category} 
                                onChange={() => {}} 
                                onClick={() => {
                                    if (mainQuery.category === category) setMainQuery((q) => q = {...q, category: undefined})
                                    else handleCategoryChange(category)
                                }}
                        />
                        <span className={styles.custom__radio}></span>
                        <span>{category}</span>
                    </label>
                ))}

            </div>
            <h4>Price</h4>
            <DoubleSlider onChange={handleSliderChange}/>
        </div>
    )
}

export default SideBar