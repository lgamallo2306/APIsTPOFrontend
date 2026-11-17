import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkout } from '../../redux/cartSlice'
import { formatPrice } from '../../utils/format'
import { isRejectedCard, onlyDigits } from '../../utils/payment'
import EmptyState from '../ui/EmptyState'
import PaymentForm from './PaymentForm'
import PaymentSummary from './PaymentSummary'
import './Payment.css'


function Payment() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const { cart, loading } = useSelector((state) => state.cart)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')

  const handlePay = (form) => {
    setError('')
    if (isRejectedCard(onlyDigits(form.cardNumber))) {
      setError('Pago rechazado por el emisor de la tarjeta. Probá con otra.')
      return
    }
    setPaying(true)
    dispatch(checkout(token)).then((result) => {
      if (result.error) {
        setPaying(false)
        setError(result.error.message)
        return
      }
      const order = result.payload
      navigate(`/compra/${order.id}/confirmada`, { replace: true, state: { order } })
    })
  }

  if (loading || !cart) return <div className="skel payment-skeleton" />


  if (cart.items.length === 0 && !paying) {
    return <EmptyState title="No hay nada para pagar" text="Tu carrito está vacío." actionLabel="Ver productos" onAction={() => navigate('/catalogo')} />
  }

  return (
    <section className="payment">
      <h1 className="h1">Pago</h1>
      <div className="payment-content">
        <PaymentForm total={formatPrice(cart.total)} paying={paying} error={error} onPay={handlePay} />
        <PaymentSummary cart={cart} />
      </div>
    </section>
  )
}

export default Payment
