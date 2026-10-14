import { formatPrice } from '../../utils/format'
import './CartSummary.css'

function CartSummary({ total, disabled, onClear, onCheckout }) {
  return (
    <aside className="card cart-summary">
      <h2 className="h3">Resumen</h2>
      <div className="divider" />
      <div className="kv">
        <span>Total</span>
        <span className="price cart-summary-total">{formatPrice(total)}</span>
      </div>
      <button type="button" className="btn btn-primary btn-lg" disabled={disabled} onClick={onCheckout}>
        {disabled ? 'Procesando…' : 'Confirmar compra'}
      </button>
      <button type="button" className="btn btn-ghost" disabled={disabled} onClick={onClear}>Vaciar carrito</button>
    </aside>
  )
}

export default CartSummary
