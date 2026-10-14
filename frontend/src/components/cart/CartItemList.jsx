import CartItem from './CartItem'
import './CartItemList.css'

function CartItemList({ items, products, disabled, onQuantity }) {
  return (
    <ul className="cart-item-list">
      {items.map((item) => (
        <CartItem key={item.id} item={item} product={products.find((product) => product.id === item.productId)}
          disabled={disabled} onQuantity={onQuantity} />
      ))}
    </ul>
  )
}

export default CartItemList
