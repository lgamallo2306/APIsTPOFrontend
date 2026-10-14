import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getOrder } from '../../utils/api'
import EmptyState from '../ui/EmptyState'
import OrderSummary from './OrderSummary'
import './OrderConfirmation.css'

const ERROR_CARGA = 'No pudimos traer la compra. Revisá tu conexión e intentá de nuevo.'

function OrderConfirmation({ token, onLogout }) {
  const location = useLocation()
  const id = location.pathname.split('/')[2] // "/compra/12/confirmada" → "12"
  // viniendo del checkout la orden llega en location.state; si se entra por URL o se recarga sin state, se pide al back
  const orderFromCheckout = location.state ? location.state.order : null
  const [order, setOrder] = useState(orderFromCheckout)
  const [loading, setLoading] = useState(orderFromCheckout === null)
  const [error, setError] = useState('')
  const [expired, setExpired] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (orderFromCheckout !== null) return
    getOrder(token, id)
      .then((data) => {
        setOrder(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) setExpired(true)
        setError(err.status ? err.message : ERROR_CARGA)
        setLoading(false)
      })
  }, [token, id, retry, orderFromCheckout])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetry(retry + 1)
  }

  if (loading) return <section className="order-confirmation"><div className="skel order-confirmation-skeleton" /></section>

  // sesión vencida: el usuario confirma y se cierra la sesión (App muestra el login en esta misma URL)
  if (expired) return <EmptyState title="Tu sesión venció" text="Ingresá de nuevo para ver tu compra." actionLabel="Ingresar" onAction={onLogout} />

  if (error) return <EmptyState title="No pudimos cargar la compra" text={error} actionLabel="Reintentar" onAction={handleRetry} />

  return (
    <section className="order-confirmation">
      <OrderSummary order={order} />
    </section>
  )
}

export default OrderConfirmation
