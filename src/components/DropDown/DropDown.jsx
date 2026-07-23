import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import styles from './DropDown.module.css';

function DropDown({ options, currentValue, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (buttonRef.current && !buttonRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={buttonRef} className={styles.root}>
            <div    className={styles.button}
                    onClick={() => setIsOpen(prev => !prev)}
            >
                <span>{currentValue}</span>
                <IconChevronDown className={clsx(
                    styles.icon,
                    isOpen && styles.rotate
                )}/>
            </div>

            {isOpen && (
                <ul className={styles.menu}>
                    {options.map((value) => (
                        <li key={value} className={value === currentValue ? styles.currentValue : null} onClick={() => {
                            setIsOpen(false);
                            onChange(value)
                        }
                        }>{value}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropDown