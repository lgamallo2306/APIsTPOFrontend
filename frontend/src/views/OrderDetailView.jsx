import OrderDetailContainer from '../components/orders/OrderDetailContainer'

function OrderDetailView({ token, onLogout }) {
  return (
    <main>
      <OrderDetailContainer token={token} onLogout={onLogout} />
    </main>
  )
}

export default OrderDetailView
