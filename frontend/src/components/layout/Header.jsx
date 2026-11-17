import { useSelector } from 'react-redux'
import { countUnits } from '../../utils/format'
import Logo from './Logo'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import UserMenu from './UserMenu'
import AuthButtons from './AuthButtons'
import './Header.css'

function Header() {
  const user = useSelector((state) => state.auth.user)
  const cart = useSelector((state) => state.cart.cart)
  const cartCount = cart ? countUnits(cart.items) : 0

  return (
    <header className="header">
        <Logo />
        <SearchBar />
        <div className='header-actions'>
            <CartIcon count={cartCount} />
             {user ? <UserMenu /> : <AuthButtons />}
        </div>
   
    </header>
  )
}

export default Header