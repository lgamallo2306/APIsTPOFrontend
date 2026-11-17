import { formatPrice, countUnits } from '../../utils/format'
import './PaymentSummary.css'

function PaymentSummary({ cart }) {
  const units = countUnits(cart.items)

  return (
    <aside className="card payment-summary">
      <h2 className="h3">Tu compra</h2>
      <ul className="payment-summary-list">
        {cart.items.map((item) => (
          <li key={item.productId} className="kv small">
            <span>{item.quantity} × {item.productName}</span>
            <span>{formatPrice(item.subtotal)}</span>
          </li>
        ))}
      </ul>
      <div className="divider" />
      <div className="kv">
        <span>Total ({units} {units === 1 ? 'producto' : 'productos'})</span>
        <span className="price payment-summary-total">{formatPrice(cart.total)}</span>
      </div>
    </aside>
  )
}

export default PaymentSummary
