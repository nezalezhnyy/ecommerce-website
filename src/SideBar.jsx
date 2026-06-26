import { useState, useEffect, useContext } from "react";
import { db, fetchItems } from "./firebaseClient";
import { query, getDocs, getDoc, where, collection, orderBy, limit, } from "firebase/firestore";

import { MainQueryContext } from "./MainPage.jsx";
import DoubleSlider from "./DoubleSlider.jsx";

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
        <div className="sidebar">
            <h4>Categories</h4>
            <div className="sidebar__categories">

                {categories.map((category) => (
                    <label  className="sidebar__category" 
                            key={category} 
                            onClick={() => setMainQuery((q) => ({ ...q, category: category}))}>

                        <input type="radio" name="category" value={category}/>
                        <span className="custom-radio"></span>
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