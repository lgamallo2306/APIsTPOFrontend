import { Link, useLocation } from 'react-router-dom'
import './SellerNav.css'

const SELLER_LINKS = [
  { to: '/vendedor/productos', label: 'Mis productos' },
  { to: '/vendedor/productos/nuevo', label: 'Nuevo producto' },
  { to: '/vendedor/calculadora', label: 'Calculadora de precio' },
  { to: '/vendedor/ventas', label: 'Mis ventas' },
]

const ACCOUNT_LINKS = [
  { to: '/mis-compras', label: 'Mis compras' },
  { to: '/perfil', label: 'Perfil' },
]

function SellerNav() {
  const location = useLocation()

  return (
    <nav className="seller-nav" aria-label="Panel vendedor">
      <span className="eyebrow seller-nav-title">Panel vendedor</span>
      {SELLER_LINKS.map((link) => (
        <Link key={link.to} to={link.to} className={location.pathname === link.to ? 'navlink on' : 'navlink'}>{link.label}</Link>
      ))}
      <span className="eyebrow seller-nav-title">Cuenta</span>
      {ACCOUNT_LINKS.map((link) => (
        <Link key={link.to} to={link.to} className="navlink">{link.label}</Link>
      ))}
    </nav>
  )
}

export default SellerNav
