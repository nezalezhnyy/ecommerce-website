import { useState, useEffect } from "react"
import { db, fetchItems } from "./firebaseClient"
import { query, getDocs, getDoc, where, collection, orderBy, limit, } from "firebase/firestore"

import DoubleSlider from "./DoubleSlider.jsx"


function SideBar() {

    const [categories, setCategories] = useState([])

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
                    <a href="#" className="sidebar__category" key={category}>
                        {category}
                    </a>
                ))}
            </div>
            <h4>Price</h4>
            <DoubleSlider />
        </div>
    )
}

export default SideBar