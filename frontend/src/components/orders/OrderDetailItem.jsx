import { formatPrice } from '../../utils/format'
import OrderItemName from './OrderItemName'
import './OrderDetailItem.css'

function OrderDetailItem({ item, onReview }) {
  return (
    <li className="order-detail-item">
      <div className="kv">
        <OrderItemName item={item} />
        <span>{formatPrice(item.subtotal)}</span>
      </div>
      <div className="order-detail-item-actions">
        <button type="button" className="btn btn-secondary btn-sm"
          onClick={() => onReview({ type: 'product', id: item.productId, name: item.productName })}>
          Reseñar producto
        </button>
        {item.sellerId !== null && (
          <button type="button" className="btn btn-secondary btn-sm"
            onClick={() => onReview({ type: 'seller', id: item.sellerId, name: item.sellerName })}>
            Reseñar vendedor
          </button>
        )}
      </div>
    </li>
  )
}

export default OrderDetailItem
