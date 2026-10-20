import { Link } from 'react-router-dom'
import './OrderItemName.css'

function OrderItemName({ item }) {
  return (
    <span>
      {item.quantity} ×{' '}
      {item.productActive ? (
        <Link to={`/productos/${item.productId}`} className="order-item-name-link">{item.productName}</Link>
      ) : (
        <>
          {item.productName} <span className="small muted">· ya no está publicado</span>
        </>
      )}
    </span>
  )
}

export default OrderItemName
