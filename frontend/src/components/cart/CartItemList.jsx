import CartItem from './CartItem'
import './CartItemList.css'

function CartItemList({ items, disabled, onQuantity }) {
  return (
    <ul className="cart-item-list">
      {items.map((item) => (
        <CartItem key={item.id} item={item} disabled={disabled} onQuantity={onQuantity} />
      ))}
    </ul>
  )
}

export default CartItemList
