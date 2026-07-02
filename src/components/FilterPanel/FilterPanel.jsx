import { useContext } from 'react';

import { MainQueryContext } from "../MainPage/MainPage.jsx";

import { IconX } from '@tabler/icons-react';

import DropDown from '../DropDown/DropDown';
import Button from '../Button/Button.jsx';

import styles from './FilterPanel.module.css';

function FilterPanel() {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);

    function handleSortSelect(value) {
        setMainQuery((q) => ({ ...q, sortBy: value}))
    }

    function handleClearFilters() {
        setMainQuery({
            category: undefined,
            priceRange: undefined,
            "thumb1": 0, 
            "thumb2": 100
        })
        
    }

    return (
        <div className={styles.root}>
            <Button text="Clear filters" Icon={IconX} onClick={() => handleClearFilters()}/>
            <DropDown onSelect={handleSortSelect} options={["by rating", "new", "price: low to high", "price: high to low"]}/>
        </div>
    )
}

export default FilterPanel