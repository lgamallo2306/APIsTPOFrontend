import Logo from './Logo'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import UserMenu from './UserMenu'
import AuthButtons from './AuthButtons'
import './Header.css'
import CatalogButton from './CatalogButton'

function Header({ user, cartCount, onLogout}) {
  return (
    <header className="header">
        <Logo />
        <SearchBar />
        <div className='header-actions'>
            <CartIcon count={cartCount} />
             {user ? <UserMenu user={user} onLogout={onLogout} /> : <AuthButtons />}
        </div>
   
    </header>
  )
}

export default Header