import { query, collection, orderBy, limit } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db, fetchItems } from '../../firebaseClient.js';

import styles from './DoubleSlider.module.css'

function DoubleSlider() {

    const [thumbPosition1, setThumbPosition1] = useState(10);
    const [thumbPosition2, setThumbPosition2] = useState(90);

    const [priceRange, setPriceRange] = useState([0, 25000])
    const [maxPrice, setMaxPrice] = useState()

    useEffect(() => {
        async function findMaxPrice() {
            const q = query(
                collection(db, 'products'),
                orderBy('price', 'desc'),
                limit(1)
            );

            const product = await fetchItems(q);
            const price = product[0].price;

            setMaxPrice(price);
            setPriceRange([price * thumbPosition1 / 100, price * thumbPosition2 / 100])
        }
        findMaxPrice();
    }, [])

    useEffect(() => {
        if (maxPrice) {
            setPriceRange([maxPrice * thumbPosition1 / 100, maxPrice * thumbPosition2 / 100])
        } else return
    }, [thumbPosition1, thumbPosition2])

    function mouseDownHandler(event, thumbNumber) {
        event.preventDefault();

        const cursorPos = event.clientX;

        function handleMouseMove(e) {
            mouseMoveHandler(e, thumbNumber)
        }

        function mouseUpHandler(e) {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', mouseUpHandler)
        }
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', mouseUpHandler);
    }

    function mouseMoveHandler(event, thumbNumber) {

        const sliderWidth = document.querySelector("." + styles.slider).clientWidth;
        const thumbWidth = document.querySelector("." + styles.thumb).clientWidth;

        if (thumbNumber === 1) {
            setThumbPosition1((p) => {
                const next = p + ((event.movementX) / sliderWidth) * 100;
                return Math.min(Math.max(next, 0), thumbPosition2 - ((thumbWidth / sliderWidth) * 100));
            });
        } else {
            setThumbPosition2((p) => {
                const next = p + ((event.movementX) / sliderWidth) * 100;
                return Math.min(Math.max(next, thumbPosition1 + ((thumbWidth / sliderWidth) * 100)), 100);
            });
        }
    }

    
    
    return (
        <div className={styles.root}>
            <div className={styles.values}>
                <span>{Math.round(priceRange[0])}</span>
                <span>{Math.round(priceRange[1])}</span>
            </div>
            <div className={styles.slider} style={{
                background: `linear-gradient(
                    to right,
                    var(--color-light-gray) 0%,
                    var(--color-light-gray) ${thumbPosition1}%,
                    var(--border-color-gray) ${thumbPosition1}%,
                    var(--border-color-gray) ${thumbPosition2}%,
                    var(--color-light-gray) ${thumbPosition2}%,
                    var(--color-light-gray) 100%
                )`
            }}>
                <div    className={styles.thumb} 
                        onMouseDown={(e) => mouseDownHandler(e, 1)} 
                        style={{left: thumbPosition1 + '%'}}>
                </div>
                <div    className={styles.thumb} 
                        onMouseDown={(e) => mouseDownHandler(e, 2)} 
                        style={{left: thumbPosition2 + '%'}}>
                </div>
            </div>
        </div>
    )
}

export default DoubleSlider