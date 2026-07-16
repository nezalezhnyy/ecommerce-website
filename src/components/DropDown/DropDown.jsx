import clsx from 'clsx';

import { useState, useEffect, useRef } from 'react';

import { IconChevronDown } from '@tabler/icons-react';

import styles from './DropDown.module.css';

function DropDown({ sortOptions, selectedSort, setSelectedSort, handleSortSelect }) {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (buttonRef.current && !buttonRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div ref={buttonRef} className={styles.root}>
            <div    className={styles.button}
                    onClick={() => setOpen(o => o = !o)}
            >
                <span>{selectedSort}</span>
                <IconChevronDown className={clsx(
                    styles.icon,
                    open && styles.rotate
                )}/>
            </div>

            {open && (
                <ul className={styles.menu}>
                    {sortOptions.map((option) => (
                        <li key={option} className={option === selectedSort ? styles.selectedSort : null} onClick={() => {
                            setOpen(false);
                            handleSortSelect(option)
                        }
                        }>{option}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropDown