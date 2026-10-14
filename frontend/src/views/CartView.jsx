import Cart from '../components/cart/Cart'

function CartView({ cart, products, error, onRetry, token, onCartChange, onLogout }) {
  return (
    <main>
      <Cart cart={cart} products={products} error={error} onRetry={onRetry} token={token} onCartChange={onCartChange} onLogout={onLogout} />
    </main>
  )
}

export default CartView
