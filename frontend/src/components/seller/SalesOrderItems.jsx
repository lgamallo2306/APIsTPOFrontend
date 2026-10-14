import { formatPrice } from '../../utils/format'
import './SalesOrderItems.css'

function SalesOrderItems({ items }) {
  return (
    <tr>
      <td colSpan="6" className="sales-order-items">
        {items.map((item) => (
          <div key={item.productId} className="kv small sales-order-items-row">
            <span>
              {item.productName} <span className="muted">· {item.quantity} × {formatPrice(item.unitPrice)}</span>
            </span>
            <span className="sales-order-items-subtotal">{formatPrice(item.subtotal)}</span>
          </div>
        ))}
      </td>
    </tr>
  )
}

export default SalesOrderItems
