
import { useEffect, useState, useContext } from 'react';

import { MainQueryContext } from "../../pages/MainPage/MainPage.jsx";

import styles from './DoubleSlider.module.css'
import { supabase } from '../../supabase.js';

function DoubleSlider({onChange}) {

    const {mainQuery, setMainQuery} = useContext(MainQueryContext);

    const [priceRange, setPriceRange] = useState([0, 1]);
    const [maxPrice, setMaxPrice] = useState();

    useEffect(() => {
        async function findMaxPrice() {
            const { data, error } = await supabase
                .schema('webshop')
                .from('products')
                .select('price')
                .order('price', { ascending: false })
                .limit(1)
            
            const price = data[0].price

            setMaxPrice(price);
            setPriceRange([price * mainQuery.thumb1 / 100, price * mainQuery.thumb2 / 100])
        }
        findMaxPrice();
    }, [])

    useEffect(() => {
        if (maxPrice) {
            setPriceRange([maxPrice * mainQuery.thumb1 / 100, maxPrice * mainQuery.thumb2 / 100])
        } else return
    }, [mainQuery.thumb1, mainQuery.thumb2])

    useEffect(() => {
        onChange(priceRange);
    }, [priceRange])

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
    const thumbWidthPercent = (thumbWidth / sliderWidth) * 100;

        setMainQuery((q) => {
            if (thumbNumber === 1) {
                const next = q.thumb1 + (event.movementX / sliderWidth) * 100;
                const clamped = Math.min(
                    Math.max(next, 0),
                    q.thumb2 - thumbWidthPercent
                );
                return { ...q, thumb1: clamped };
            } else {
                const next = q.thumb2 + (event.movementX / sliderWidth) * 100;
                const clamped = Math.min(
                    Math.max(next, q.thumb1 + thumbWidthPercent),
                    100
                );
                return { ...q, thumb2: clamped };
            }
        });
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
                    var(--color-light-gray) ${mainQuery.thumb1}%,
                    var(--border-color-gray) ${mainQuery.thumb1}%,
                    var(--border-color-gray) ${mainQuery.thumb2}%,
                    var(--color-light-gray) ${mainQuery.thumb2}%,
                    var(--color-light-gray) 100%
                )`
            }}>
                <div    className={styles.thumb} 
                        onMouseDown={(e) => mouseDownHandler(e, 1)} 
                        style={{left: mainQuery.thumb1 + '%'}}>
                </div>
                <div    className={styles.thumb} 
                        onMouseDown={(e) => mouseDownHandler(e, 2)} 
                        style={{left: mainQuery.thumb2 + '%'}}>
                </div>
            </div>
        </div>
    )
}

export default DoubleSlider