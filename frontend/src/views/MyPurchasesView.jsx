import PurchasesContainer from '../components/orders/PurchasesContainer'

function MyPurchasesView({ token, onLogout }) {
  return (
    <main>
      <PurchasesContainer token={token} onLogout={onLogout} />
    </main>
  )
}

export default MyPurchasesView
