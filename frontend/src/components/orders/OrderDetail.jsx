import { Link } from 'react-router-dom'
import { formatPrice, formatDate } from '../../utils/format'
import './OrderDetail.css'

function OrderDetail({ order }) {
  return (
    <section className="order-detail">
      <Link to="/mis-compras" className="btn btn-ghost btn-sm order-detail-back">← Volver a mis compras</Link>
      <div className="card order-detail-card">
        <h1 className="h1">Orden #{order.id}</h1>
        <p className="muted">{formatDate(order.date)}</p>
        <ul className="order-detail-items">
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
          <span className="price">{formatPrice(order.total)}</span>
        </div>
      </div>
    </section>
  )
}

export default OrderDetail
