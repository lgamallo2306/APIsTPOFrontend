import Cart from '../components/cart/Cart'
import BackButton from '../components/layout/BackButton'

function CartView({ cart, products, error, onRetry, token, onCartChange, onLogout }) {
  return (
    <main>
      <div style={{ padding: '16px 24px 0 24px' }}>
        <BackButton />
      </div>
      <Cart cart={cart} products={products} error={error} onRetry={onRetry} token={token} onCartChange={onCartChange} onLogout={onLogout} />
    </main>
  )
}

export default CartView
