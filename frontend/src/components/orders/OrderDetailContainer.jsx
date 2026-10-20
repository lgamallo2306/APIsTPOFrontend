import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrder } from '../../utils/api'
import EmptyState from '../ui/EmptyState'
import OrderDetail from './OrderDetail'
import ReviewModal from '../reviews/ReviewModal'

const ERROR_CARGA = 'No pudimos traer la compra. Revisá tu conexión e intentá de nuevo.'

function OrderDetailContainer({ token, onLogout }) {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expired, setExpired] = useState(false)
  const [retry, setRetry] = useState(0)
  const [lastId, setLastId] = useState(id)
  const [reviewTarget, setReviewTarget] = useState(null)

  // si cambia el id desde la URL, se vuelve a cargar (patrón de guardar el valor anterior antes del return)
  if (id !== lastId) {
    setLastId(id)
    setLoading(true)
  }

  useEffect(() => {
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
  }, [token, id, retry])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetry(retry + 1)
  }

  if (loading) return <div className="skel order-detail-skeleton" />

  if (expired) return <EmptyState title="Tu sesión venció" text="Ingresá de nuevo para ver esta compra." actionLabel="Ingresar" onAction={onLogout} />

  if (error) return <EmptyState title="No pudimos cargar la compra" text={error} actionLabel="Reintentar" onAction={handleRetry} />

  return (
    <>
      <OrderDetail order={order} onReview={setReviewTarget} />
      {reviewTarget && (
        <ReviewModal token={token} target={reviewTarget} onClose={() => setReviewTarget(null)} onLogout={onLogout} />
      )}
    </>
  )
}

export default OrderDetailContainer
