import { Link } from 'react-router-dom'

import { IconSearch, IconShoppingCart, IconHeart, IconUser } from '@tabler/icons-react';
import Button from '../Button/Button';

import styles from './Header.module.css';

function Header() {
    return(
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.header}>
                    <Link to={'/'} className='link'>
                        <div className={styles.logo}>
                            <h2>Market</h2>
                        </div>
                    </Link>
                    <div className={styles.search}>
                        <IconSearch stroke={1.4}/>
                        <input 
                            type="text"
                            placeholder='Enter a search query'
                            className={styles.search__input} 
                        />
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
                </div>
            </div>
        </div>
    )
}

export default Header