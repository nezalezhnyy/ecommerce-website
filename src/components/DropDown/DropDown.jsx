import clsx from 'clsx';

import { useState, useEffect, useRef } from 'react';

import { IconChevronDown } from '@tabler/icons-react';

import styles from './DropDown.module.css';

function DropDown({onSelect, options}) {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const buttonRef = useRef(null);

    useEffect(() => {
        onSelect(selectedOption)
    }, [selectedOption])

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
                <span>{selectedOption}</span>
                <IconChevronDown className={clsx(
                    styles.icon,
                    open && styles.rotate
                )}/>
            </div>

            {open && (
                <ul className={styles.menu}>
                    {options.map((option) => (
                        <li key={option} className={option === selectedOption ? styles.selectedOption : null} onClick={() => {
                            setOpen(false);
                            setSelectedOption(option)
                        }
                        }>{option}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropDown