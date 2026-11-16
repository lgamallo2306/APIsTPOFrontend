import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchOrder } from '../../redux/ordersSlice'
import EmptyState from '../ui/EmptyState'
import OrderSummary from './OrderSummary'
import './OrderConfirmation.css'

// Confirmación: si viene del checkout, la orden llega en location.state; si no, se pide al back
function OrderConfirmation({ token }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const id = location.pathname.split('/')[2] // "/compra/12/confirmada" → "12"
  const orderFromCheckout = location.state ? location.state.order : null
  const detail = useSelector((state) => state.orders.detail)

  useEffect(() => {
    if (orderFromCheckout === null && detail.id !== id) dispatch(fetchOrder({ token, id }))
  }, [dispatch, token, id, orderFromCheckout, detail.id])

  if (orderFromCheckout === null && (detail.id !== id || detail.loading)) {
    return <section className="order-confirmation"><div className="skel order-confirmation-skeleton" /></section>
  }

  if (orderFromCheckout === null && detail.error) {
    return <EmptyState title="No pudimos cargar la compra" text={detail.error} actionLabel="Reintentar" onAction={() => dispatch(fetchOrder({ token, id }))} />
  }

  const order = orderFromCheckout !== null ? orderFromCheckout : detail.order

  return (
    <section className="order-confirmation">
      <OrderSummary order={order} />
    </section>
  )
}

export default OrderConfirmation
