import { useState, useContext } from 'react';

import { MainQueryContext } from "../../pages/MainPage/MainPage.jsx";

import { IconX } from '@tabler/icons-react';

import DropDown from '../DropDown/DropDown';
import Button from '../Button/Button.jsx';

import styles from './FilterPanel.module.css';

function FilterPanel({ DEFAULT_MAIN_QUERY }) {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);

    const sortOptions = ["by rating", "new", "price: low to high", "price: high to low"];
    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

    function handleSortSelect(value) {
        setMainQuery((prev) => {
            const next = new URLSearchParams(prev);
            next.set('sortBy', value);
            
            return next
        });
        setSelectedSort(value)
    }

    function handleClearFilters() {
        setSelectedSort(sortOptions[0]);
        setMainQuery(DEFAULT_MAIN_QUERY);
    }

    return (
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.filterPanel}>
                    <Button onClick={() => handleClearFilters()}>
                        Clear filters
                        <IconX stroke={1.4}/>
                    </Button>
                    <DropDown sortOptions={sortOptions} selectedSort={selectedSort} handleSortSelect={handleSortSelect} />
                </div>
            </div>
        </div>
    )
}

export default FilterPanel