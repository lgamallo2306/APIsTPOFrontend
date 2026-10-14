import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../../utils/api'
import EmptyState from '../ui/EmptyState'
import PurchaseRow from './PurchaseRow'
import './PurchasesContainer.css'

const ERROR_CARGA = 'No pudimos traer tus compras. Revisá tu conexión e intentá de nuevo.'

function PurchasesContainer({ token, onLogout }) {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expired, setExpired] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    getOrders(token)
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) setExpired(true)
        setError(err.status ? err.message : ERROR_CARGA)
        setLoading(false)
      })
  }, [token, retry])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetry(retry + 1)
  }

  if (loading) return <section className="purchases"><div className="skel purchases-skeleton" /></section>

  // sesión vencida: App muestra el login en esta misma URL
  if (expired) return <EmptyState title="Tu sesión venció" text="Ingresá de nuevo para ver tus compras." actionLabel="Ingresar" onAction={onLogout} />

  if (error) return <EmptyState title="No pudimos cargar tus compras" text={error} actionLabel="Reintentar" onAction={handleRetry} />

  if (orders.length === 0) return <EmptyState title="Todavía no compraste nada" text="Cuando completes una compra, va a aparecer acá." actionLabel="Ir al catálogo" onAction={() => navigate('/')} />

  return (
    <section className="purchases">
      <h1 className="h1">Mis compras</h1>
      <ul className="purchases-list">
        {orders.map((order) => (
          <PurchaseRow key={order.id} order={order} />
        ))}
      </ul>
    </section>
  )
}

export default PurchasesContainer
