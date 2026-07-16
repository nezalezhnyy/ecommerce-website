import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './DoubleSlider.module.css'

function DoubleSlider({ leftValue, rightValue, biggestValue, onChange }) {
    const [sliderValue, setSliderValue] = useState({left: leftValue, right: rightValue});
    const sliderValueRef = useRef(sliderValue);
    const [isDragging, setIsDragging] = useState(false);

    const valueToPercent = useCallback((value) => (value / biggestValue) * 100, [biggestValue]);
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    useEffect(() => {
        setSliderValue({ left: leftValue, right: rightValue });
    }, [leftValue, rightValue]);

    useEffect(() => {
        sliderValueRef.current = sliderValue;
    }, [sliderValue]);

    const mouseDownHandler = (e) => {
        e.preventDefault();
        setIsDragging(true);
        const name = e.currentTarget.dataset.name;
        const sliderWidth = document.querySelector("." + styles.slider).clientWidth;
        const thumbWidthPercent = (e.currentTarget.clientWidth / sliderWidth) * 100;
        const thumbGapValue = (thumbWidthPercent * biggestValue) / 100;

        function mouseMoveHandler(e) {
            const deltaValue = (e.movementX / sliderWidth) * biggestValue;

            setSliderValue(prev => {
                let newValue = prev[name] + deltaValue;

                if (name === 'left') {
                    newValue = clamp(newValue, 0, prev.right - thumbGapValue);
                } else {
                    newValue = clamp(newValue, prev.left + thumbGapValue, biggestValue);
                }

                const updated = {...prev, [name]: Math.round(newValue)};
                return updated;
            })
        };

        function mouseUpHandler(e) {
            setIsDragging(false);
            const { left, right } = sliderValueRef.current;
            onChange(left, right);
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
        
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const handleInputChange = (e) => {
        setSliderValue(prev => {
            let { name, value } = e.target;
            let newValue = 0;
            value = value.replace(/[^\d.]/g, "");
            
            if (value !== "") {
                if (name === 'left') {
                    newValue = clamp(Number(value), 0, sliderValue.right);
                }
                else {
                    newValue = clamp(Number(value), sliderValue.left, biggestValue);
                }
            };

            const updated = {...prev, [name]: Math.round(newValue)};
            onChange(updated.left, updated.right);
            return updated;
        })
    };

    const leftPercent = valueToPercent(sliderValue.left);
    const rightPercent = valueToPercent(sliderValue.right);
    
    return (
        <div className={styles.root}>
            <div className={styles.inputs}>
                <input name='left' type="text" value={sliderValue.left} onChange={handleInputChange}/>
                <input name='right' type="text" value={sliderValue.right} onChange={handleInputChange}/>
            </div>
            <div 
                className={styles.slider}
                style={{
                    background: `linear-gradient(
                        to right,
                        var(--color-light-gray) 0%,
                        var(--color-light-gray) ${leftPercent}%,
                        var(--border-color-gray) ${leftPercent}%,
                        var(--border-color-gray) ${rightPercent}%,
                        var(--color-light-gray) ${rightPercent}%,
                        var(--color-light-gray) 100%
                    )`
                }}>
                <div    className={styles.thumb}
                        data-name='left'
                        onMouseDown={mouseDownHandler} 
                        style={{left: leftPercent + '%'}}>
                </div>
                <div    className={styles.thumb}
                        data-name='right'
                        onMouseDown={mouseDownHandler} 
                        style={{left: rightPercent + '%'}}>
                </div>
            </div>
        </div>
    )
}

export default DoubleSlider