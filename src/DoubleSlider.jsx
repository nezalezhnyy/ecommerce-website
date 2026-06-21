import { query, collection, orderBy, limit } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { db, fetchItems } from './firebaseClient.js';

function DoubleSlider() {

    const [pointPosition1, setPointPosition1] = useState(10);
    const [pointPosition2, setPointPosition2] = useState(90);

    const [priceRange, setPriceRange] = useState([])

    useEffect(() => {
        async function findMaxPrice() {
            const q = query(
                collection(db, 'products'),
                orderBy('price', 'desc'),
                limit(1)
            );

            const maxPrice = await fetchItems(q);

            console.log(maxPrice[0].price)
        }
        findMaxPrice()
    }, [])

    function mouseDownHandler(event, pointNumber) {
        event.preventDefault();

        const cursorPos = event.clientX;

        function handleMouseMove(e) {
            mouseMoveHandler(e, pointNumber)
        }

        function mouseUpHandler(e) {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', mouseUpHandler)
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', mouseUpHandler);
    }

    function mouseMoveHandler(event, pointNumber) {

        const sliderWidth = document.querySelector('.slider').clientWidth;
        const pointWidth = document.querySelector('.slider__point').clientWidth;

        if (pointNumber === 1) {
            setPointPosition1((p) => {
                const next = p + ((event.movementX) / sliderWidth) * 100;
                return Math.min(Math.max(next, 0), pointPosition2 - ((pointWidth / sliderWidth) * 100));
            });
        } else {
            setPointPosition2((p) => {
                const next = p + ((event.movementX) / sliderWidth) * 100;
                return Math.min(Math.max(next, pointPosition1 + ((pointWidth / sliderWidth) * 100)), 100);
            });
        }
    }

    
    
    return (
        <div className='slider__container'>
            <div className='slider__text__container'>
                <span>{Math.round(pointPosition1)}</span>
                <span>{Math.round(pointPosition2)}</span>
            </div>
            <div className="slider" style={{
                background: `linear-gradient(
                    to right,
                    rgb(180, 180, 180) 0%,
                    rgb(180, 180, 180) ${pointPosition1}%,
                    #000000 ${pointPosition1}%,
                    #000000 ${pointPosition2}%,
                    rgb(180, 180, 180) ${pointPosition2}%,
                    rgb(180, 180, 180) 100%
                )`
            }}>
                <div    className="slider__point slider__point1" 
                        onMouseDown={(e) => mouseDownHandler(e, 1)} 
                        style={{left: pointPosition1 + '%'}}>
                </div>
                <div    className="slider__point slider__point2" 
                        onMouseDown={(e) => mouseDownHandler(e, 2)} 
                        style={{left: pointPosition2 + '%'}}>
                </div>
            </div>
        </div>
    )
}

export default DoubleSlider