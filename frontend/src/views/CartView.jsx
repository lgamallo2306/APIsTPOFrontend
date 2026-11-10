import Cart from '../components/cart/Cart'
import BackButton from '../components/layout/BackButton'

function CartView({ token }) {
  return (
    <main>
      <div style={{ padding: '16px 24px 0 24px' }}>
        <BackButton />
      </div>
      <Cart token={token} />
    </main>
  )
}

export default CartView
