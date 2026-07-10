import { supabase } from "../../supabase.js";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Button/Button.jsx";

import styles from "./ProductDetail.module.css";
import clsx from "clsx";

function ProductDetail() {
    const { id } = useParams();
    const [ details, setDetails] = useState({});
    const [ mainImage, setMainImage ] = useState(0);

    useEffect(() => {
        async function getDetails() {
            const { data, error } = await
                supabase.schema('webshop')
                .from('products')
                .select('*')
                .eq('id', id)

            setDetails(...data);
            console.log(...data)
        }
        getDetails()
    }, [])

    return (
        <div className={styles.root}>
            <div className="container">
                <div className={styles.productDetail}>
                    <div className={styles.imageAndTitle}>
                        <div className={styles.imageContainer}>
                            <div className={styles.imageList}>
                                {details.images && details.images.map((img, index) => (
                                    <div 
                                        className={clsx(
                                            styles.img,
                                            (index === mainImage) && styles[`img--current`],
                                        )} 
                                        style={{backgroundImage: `URL(${img})`}}
                                        key={index}
                                        onClick={() => (index !== mainImage) ? setMainImage(index) : null}
                                    >
                                    </div>
                                ))}
                            </div>
                            <div className={styles.mainImage} style={{backgroundImage: `URL(${details.images && details.images[mainImage]})`}}></div>
                        </div>
                        <div className={styles.titleContainer}>
                            <span className={styles.inStock}>In stock: <span>{details.stock}</span></span>
                            <h2 className={styles.title}>{details.title}</h2>
                            <h1 className={styles.price}>{details.price}$</h1>
                            <div className={styles.buttons}>
                                <Button size="large" variant="filled">
                                    Buy Now
                                </Button>
                                <Button size="large" variant="default">
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail