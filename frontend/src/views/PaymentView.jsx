import Payment from '../components/payment/Payment'
import BackButton from '../components/layout/BackButton'

function PaymentView() {
  return (
    <main>
      <div style={{ padding: '16px 24px 0 24px' }}>
        <BackButton />
      </div>
      <Payment />
    </main>
  )
}

export default PaymentView
