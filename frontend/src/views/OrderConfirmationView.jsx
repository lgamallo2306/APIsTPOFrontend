import OrderConfirmation from '../components/orders/OrderConfirmation'

function OrderConfirmationView({ token, onLogout }) {
  return (
    <main>
      <OrderConfirmation token={token} onLogout={onLogout} />
    </main>
  )
}

export default OrderConfirmationView
