import { IconSearch, IconShoppingCart, IconHeart, IconUser } from '@tabler/icons-react';
import Button from './Button';

function Header() {
    return(
        <div className='header'>
            <div className='container'>
                <div className='header__container'>
                    <div className="header__logo">
                        <h2>Market</h2>
                    </div>
                    <div className="header__search">
                        <IconSearch stroke={2}/>
                        <input 
                            type="text"
                            placeholder='Enter a search query'
                            className='search__input' 
                        />
                    </div>
                    <div className='header__buttons'>
                        <Button 
                            name="button button-basket" 
                            text="Basket"
                            Icon={IconShoppingCart}
                        />
                        <Button
                            name="button button-fav"
                            text="Favorites"
                            Icon={IconHeart}
                        />
                        <Button
                            name="button button-profile"
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