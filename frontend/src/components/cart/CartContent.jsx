import { useNavigate } from 'react-router-dom'
import EmptyState from '../ui/EmptyState'
import CartItemList from './CartItemList'
import CartSummary from './CartSummary'
import './CartContent.css'

function CartContent({ cart, products, error, updating, onRetry, onQuantity, onClear, onCheckout }) {
  const navigate = useNavigate()

  if (error) return <EmptyState title="No pudimos cargar el carrito" text={error} actionLabel="Reintentar" onAction={onRetry} />

  if (!cart) return <div className="skel cart-content-skeleton" />

  if (cart.items.length === 0) {
    return <EmptyState title="Tu carrito está vacío" text="Agregá productos desde el catálogo."
      actionLabel="Ver productos" onAction={() => navigate('/catalogo')} />
  }

  return (
    <div className="cart-content">
      <CartItemList items={cart.items} products={products} disabled={updating} onQuantity={onQuantity} />
      <CartSummary total={cart.total} disabled={updating} onClear={onClear} onCheckout={onCheckout} />
    </div>
  )
}

export default CartContent
