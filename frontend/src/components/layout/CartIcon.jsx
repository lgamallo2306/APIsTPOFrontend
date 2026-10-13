import { Link } from 'react-router-dom'

function CartIcon({ count }) {
  return (
    <Link to="/carrito" className="iconbtn" aria-label={`Carrito, ${count} ítems`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" />
        <circle cx="9.5" cy="20" r="1.3" />
        <circle cx="17" cy="20" r="1.3" />
      </svg>
      {count > 0 && <span className="count">{count}</span>}
    </Link>
  )
}

export default CartIcon