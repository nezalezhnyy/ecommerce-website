import { IconSearch, IconShoppingCart, IconHeart, IconUser } from '@tabler/icons-react';
import Button from '../Button/Button';

import styles from './Header.module.css';

function Header() {
    return(
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <h2>Market</h2>
                    </div>
                    <div className={styles.search}>
                        <IconSearch stroke={1.4}/>
                        <input 
                            type="text"
                            placeholder='Enter a search query'
                            className={styles.search__input} 
                        />
                    </div>
                    <div className={styles.navbar}>
                        <Button 
                            text="Basket"
                            Icon={IconShoppingCart}
                        />
                        <Button
                            text="Favorites"
                            Icon={IconHeart}
                        />
                        <Button
                            text="Profile"
                            Icon={IconUser}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header