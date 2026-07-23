import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import clsx from 'clsx';

import { IconSearch, IconShoppingCart, IconHeart, IconUser, IconChevronLeft } from '@tabler/icons-react';
import Button from '../Button/Button';

import styles from './Header.module.css';

function Header() {
    const [searchBarVisible, setSearchBarVisible] = useState(false);
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)'});

    function toggleSearchBar() {
        setSearchBarVisible(prev => !prev);
    }

    return(
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.header} style={(searchBarVisible && !isDesktop) ? {justifyContent: 'center'} : null}>
                    {(!searchBarVisible || isDesktop) ?
                        <Link to={'/'} className='link'>
                            <div className={styles.logo}>
                                <h2>Market</h2>
                            </div>
                        </Link>
                        :
                        <Button size='medium' variant='icon' onClick={toggleSearchBar}>
                            <IconChevronLeft stroke={1.4}/>
                        </Button>
                    }
                    <div className={clsx(
                        styles.search,
                        searchBarVisible ? styles.forceVisible : null
                    )}>
                        <input 
                            type="text"
                            placeholder='Enter a search query'
                            className={styles.search__input} 
                        />
                        <IconSearch stroke={1.4}/>
                    </div>
                    <div className={styles.navbar}>
                        <Button size='medium'>
                            Cart
                            <IconShoppingCart stroke={1.4}/>
                        </Button>
                        <Button size='medium'>
                            Favorites
                            <IconHeart stroke={1.4}/>
                        </Button>
                        <Button size='medium'>
                            Profile
                            <IconUser stroke={1.4}/>
                        </Button>
                    </div>
                    {!searchBarVisible && 
                        <div className={styles.searchButton}>
                            <Button size='medium' variant='icon' onClick={toggleSearchBar}>
                                <IconSearch stroke={1.4}/>
                            </Button>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Header