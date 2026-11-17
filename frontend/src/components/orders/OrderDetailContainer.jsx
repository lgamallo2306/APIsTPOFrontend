import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOrder } from '../../redux/ordersSlice'
import EmptyState from '../ui/EmptyState'
import OrderDetail from './OrderDetail'
import ReviewModal from '../reviews/ReviewModal'

// Detalle de una orden: el id sale de la URL. Pide la orden solo si la guardada no es esa
function OrderDetailContainer() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const { id } = useParams()
  const detail = useSelector((state) => state.orders.detail)
  const [reviewTarget, setReviewTarget] = useState(null)

  useEffect(() => {
    if (detail.id !== id) dispatch(fetchOrder({ token, id }))
  }, [dispatch, token, id, detail.id])

  const loading = detail.id !== id || detail.loading

  if (loading) return <div className="skel order-detail-skeleton" />

  if (detail.error) return <EmptyState title="No pudimos cargar la compra" text={detail.error} actionLabel="Reintentar" onAction={() => dispatch(fetchOrder({ token, id }))} />

  return (
    <>
      <OrderDetail order={detail.order} onReview={setReviewTarget} />
      {reviewTarget && (
        <ReviewModal target={reviewTarget} onClose={() => setReviewTarget(null)} />
      )}
    </>
  )
}

export default OrderDetailContainer
