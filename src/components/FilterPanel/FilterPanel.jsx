import { useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { MainQueryContext } from "../../pages/MainPage/MainPage.jsx";
import { IconFilter } from '@tabler/icons-react';
import DropDown from '../DropDown/DropDown';
import Button from '../Button/Button.jsx';
import FilterButtons from '../FilterButtons/FilterButtons.jsx';
import styles from './FilterPanel.module.css';

function FilterPanel({ isDesktop, sideBarShow, setSideBarShow }) {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);
    const sortOptions = ["by rating", "new", "price: low to high", "price: high to low"];
    const currentSort = mainQuery.get('sortBy') ?? null;

    function handleSortSelect(value) {
        setMainQuery((prev) => {
            const next = new URLSearchParams(prev);
            next.set('sortBy', value);
            
            return next
        });
    }

    return (
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.filterPanelWrapper}>
                    <div className={styles.filterPanel}>
                        <FilterButtons />
                    </div>
                    <div className={styles.showFiltersBtn}>
                        <Button size='small' variant='filled' onClick={() => setSideBarShow(prev => !prev)}>
                            Filters
                            <IconFilter stroke={1.4}/>
                        </Button>
                    </div>
                    <DropDown options={sortOptions} currentValue={currentSort} onChange={handleSortSelect} />
                </div>
            </div>
        </div>
    )
}

export default FilterPanel