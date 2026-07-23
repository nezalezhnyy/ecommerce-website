import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { MainQueryContext } from "../../pages/MainPage/MainPage.jsx";
import { IconX } from '@tabler/icons-react';
import Button from '../Button/Button'
import styles from './FilterButtons.module.css'

function FilterButtons() {
    const {mainQuery, setMainQuery} = useContext(MainQueryContext);
    const filteredQuery = [...mainQuery.entries()].filter(([key, value]) => key !== 'sortBy' && key !== 'page');

    function handleClearAllFilters() {
        setMainQuery(prev => {
            const sortBy = mainQuery.get('sortBy');

            return {sortBy}
        });
    }

    function handleDeleteFilter(key) {
        setMainQuery((prev) => {
            const next = new URLSearchParams(prev);
            next.delete(`${key}`);
            console.log(next)
            
            return next
        });
    }

    return (
        <div className={styles.root}>
            {filteredQuery.length > 0 && 
                <div className={styles.filterButtons}>
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
    )
}

export default FilterButtons