import { useState, useEffect, useContext } from "react";
import { db, fetchItems } from "../../firebaseClient.js";
import { query, getDocs, getDoc, where, collection, orderBy, limit, } from "firebase/firestore";

import { MainQueryContext } from "../MainPage/MainPage.jsx";

import DoubleSlider from "../DoubleSlider/DoubleSlider.jsx";

import styles from './SideBar.module.css'

function SideBar() {

    const {mainQuery, setMainQuery} = useContext(MainQueryContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadCategories() {
            const q = query(
                collection(db, 'products'),
                orderBy('id')
            )

            const products = await fetchItems(q)

            const uniqueCategories = new Set()
        
            products.forEach((obj) => uniqueCategories.add(obj.category))

            setCategories([...uniqueCategories])
        }
        loadCategories()
    }, [])

    return (
        <div className={styles.root}>
            <h4>Categories</h4>
            <div className={styles.categories}>

                {categories.map((category) => (
                    <label  className={styles.category} 
                            key={category} 
                            onClick={() => setMainQuery((q) => ({ ...q, category: category}))}>

                        <input type="radio" name="category" value={category}/>
                        <span className={styles.custom__radio}></span>
                        <span>{category}</span>

                    </label>
                ))}

            </div>
            <h4>Price</h4>
            <DoubleSlider />
        </div>
    )
}

export default SideBar