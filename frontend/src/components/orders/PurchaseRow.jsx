import { Link } from 'react-router-dom'
import { formatPrice, formatDate } from '../../utils/format'
import './PurchaseRow.css'

// El número de orden es un Link: se puede abrir en pestaña nueva y se navega con teclado
function PurchaseRow({ order }) {
  return (
    <li className="card purchase-row">
      <div>
        <Link to={`/mis-compras/${order.id}`} className="purchase-row-link">Orden #{order.id}</Link>
        <p className="muted small">{formatDate(order.date)}</p>
      </div>
      <span className="price">{formatPrice(order.total)}</span>
    </li>
  )
}

export default PurchaseRow
