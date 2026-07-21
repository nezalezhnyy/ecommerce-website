import { useState, useContext } from 'react';

import { MainQueryContext } from "../../pages/MainPage/MainPage.jsx";

import { IconX } from '@tabler/icons-react';

import DropDown from '../DropDown/DropDown';
import Button from '../Button/Button.jsx';

import styles from './FilterPanel.module.css';

function FilterPanel({ products }) {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);

    const sortOptions = ["by rating", "new", "price: low to high", "price: high to low"];
    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
    const filteredQuery = [...mainQuery.entries()].filter(([key, value]) => key !== 'sortBy' && key !== 'page');

    function handleSortSelect(value) {
        setMainQuery((prev) => {
            const next = new URLSearchParams(prev);
            next.set('sortBy', value);
            
            return next
        });
        setSelectedSort(value)
    }

    function handleClearAllFilters() {
        setSelectedSort(sortOptions[0]);
        setMainQuery();
    }

    function handleDeleteFilter(key) {
        setMainQuery((prev) => {
            const next = new URLSearchParams(prev);
            next.delete(`${key}`);
            
            return next
        });
    }

    return (
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.filterPanelWrapper}>
                    <div className={styles.filterPanel}>
                        {products.length > 0 &&
                            <span>Products found - {products.length}</span>
                        }
                        {filteredQuery.length > 0 && 
                            <div className={styles.filterValues}>
                                <Button 
                                    size='small'
                                    variant='filter'
                                    onClick={handleClearAllFilters}>
                                    Clear all
                                </Button>
                                {filteredQuery.map(([key, value]) => (
                                    <Button size='small' variant='filter' onClick={() => handleDeleteFilter(key)} key={value}>
                                        {value}
                                        <IconX stroke={1.4}/>
                                    </Button>
                                ))}
                            </div>
                        }
                    </div>
                    <DropDown sortOptions={sortOptions} selectedSort={selectedSort} handleSortSelect={handleSortSelect} />
                </div>
            </div>
        </div>
    )
}

export default FilterPanel