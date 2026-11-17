import Cart from '../components/cart/Cart'
import BackButton from '../components/layout/BackButton'

function CartView() {
  return (
    <main>
      <div style={{ padding: '16px 24px 0 24px' }}>
        <BackButton />
      </div>
      <Cart />
    </main>
  )
}

export default CartView
