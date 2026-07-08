import { useState, useContext } from 'react';

import { MainQueryContext } from "../MainPage/MainPage.jsx";

import { IconX } from '@tabler/icons-react';

import DropDown from '../DropDown/DropDown';
import Button from '../Button/Button.jsx';

import styles from './FilterPanel.module.css';

function FilterPanel() {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);

    const sortOptions = ["by rating", "new", "price: low to high", "price: high to low"];
    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

    function handleSortSelect(value) {
        setMainQuery((q) => ({ ...q, sortBy: value}));
        setSelectedSort(value)
    }

    function handleClearFilters() {
        setSelectedSort(sortOptions[0]);
        setMainQuery({
            category: undefined,
            priceRange: undefined,
            sortBy: "by rating",
            "thumb1": 0,
            "thumb2": 100,
        })
    }

    return (
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.filterPanel}>
                    <Button text="Clear filters" Icon={IconX} onClick={() => handleClearFilters()}/>
                    <DropDown sortOptions={sortOptions} selectedSort={selectedSort} handleSortSelect={handleSortSelect} />
                </div>
            </div>
        </div>
    )
}

export default FilterPanel