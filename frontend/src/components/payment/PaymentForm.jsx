import { useState } from 'react'
import { validateCard } from '../../utils/payment'
import PaymentCardFields from './PaymentCardFields'
import './PaymentForm.css'

const EMPTY_FORM = { cardNumber: '', cardName: '', expiry: '', cvv: '' }


function PaymentForm({ total, paying, error, onPay }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = validateCard(form)
    if (message !== '') {
      setValidation(message)
      return
    }
    onPay(form)
  }

  return (
    <form className="card payment-form" onSubmit={handleSubmit}>
      <h2 className="h3">Tarjeta de crédito o débito</h2>
  
      <PaymentCardFields form={form} disabled={paying} onChange={handleChange} />
      {(validation || error) && <p className="alert-err">{validation || error}</p>}
      <button type="submit" className="btn btn-primary btn-lg" disabled={paying}>
        {paying ? 'Procesando pago…' : `Pagar ${total}`}
      </button>
    </form>
  )
}

export default PaymentForm
