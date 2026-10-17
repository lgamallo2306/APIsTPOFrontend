import { Link } from 'react-router-dom'
import { formatPrice, formatDate } from '../../utils/format'
import './OrderSummary.css'

function OrderSummary({ order }) {
  return (
    <div className="card order-summary">
      <span className="badge b-ok">Compra confirmada</span>
      <h1 className="h1">¡Gracias por tu compra!</h1>
      <p className="muted">Orden #{order.id} · {formatDate(order.date)}</p>
      <ul className="order-summary-items">
        {order.items.map((item) => (
          <li key={item.productId} className="kv">
            <span>{item.quantity} × {item.productName}</span>
            <span>{formatPrice(item.subtotal)}</span>
          </li>
        ))}
      </ul>
      <div className="divider" />
      <div className="kv">
        <span>Total</span>
        <span className="price order-summary-total">{formatPrice(order.total)}</span>
      </div>
      <div className="order-summary-actions">
        <Link to="/mis-compras" className="btn btn-primary">Ver mis compras</Link>
        <Link to="/catalogo" className="btn btn-ghost">Seguir comprando</Link>
      </div>
    </div>
  )
}

export default OrderSummary
