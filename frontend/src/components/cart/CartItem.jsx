import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/format'
import QuantityStepper from '../ui/QuantityStepper'
import './CartItem.css'

// product puede no estar (todavía no llegó o el producto ya no existe): se muestra sin imagen
function CartItem({ item, product, disabled, onQuantity }) {
  const image = product && product.imageUrls.length > 0 ? product.imageUrls[0] : null

  return (
    <li className="card cart-item">
      <div className="pimg bed cart-item-img">
        {image && <img src={image} alt={item.productName} />}
      </div>
      <Link to={`/productos/${item.productId}`} className="cart-item-name">{item.productName}</Link>
      <QuantityStepper value={item.quantity} min={1} max={product ? product.stock : undefined} disabled={disabled}
        onChange={(quantity) => onQuantity(item.productId, quantity)} />
      <span className="price cart-item-subtotal">{formatPrice(item.subtotal)}</span>
      <button type="button" className="btn btn-ghost btn-sm" disabled={disabled} onClick={() => onQuantity(item.productId, 0)}>Quitar</button>
    </li>
  )
}

export default CartItem
