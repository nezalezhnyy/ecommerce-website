import DropDown from '../DropDown/DropDown';

import { useContext } from 'react';

import { MainQueryContext } from "../MainPage/MainPage.jsx";

import styles from './FilterPanel.module.css';

function FilterPanel() {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);

    function handleSortSelect(value) {
        setMainQuery((q) => ({ ...q, sortBy: value}))
    }

    return (
        <div className={styles.root}>
            <DropDown onSelect={handleSortSelect} options={["by rating", "new", "price: low to high", "price: high to low"]}/>
        </div>
    )
}

export default FilterPanel