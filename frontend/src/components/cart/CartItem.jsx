import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/format'
import QuantityStepper from '../ui/QuantityStepper'
import './CartItem.css'

function CartItem({ item, disabled, onQuantity }) {
  return (
    <li className="card cart-item">
      <div className="pimg bed cart-item-img">
        {item.imageUrl && <img src={item.imageUrl} alt={item.productName} />}
      </div>
      <Link to={`/productos/${item.productId}`} className="cart-item-name">{item.productName}</Link>
      <QuantityStepper value={item.quantity} min={1} max={item.stock} disabled={disabled}
        onChange={(quantity) => onQuantity(item.productId, quantity)} />
      <span className="price cart-item-subtotal">{formatPrice(item.subtotal)}</span>
      <button type="button" className="btn btn-ghost btn-sm" disabled={disabled} onClick={() => onQuantity(item.productId, 0)}>Quitar</button>
    </li>
  )
}

export default CartItem
