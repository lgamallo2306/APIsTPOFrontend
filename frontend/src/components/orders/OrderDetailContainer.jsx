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
  const list = useSelector((state) => state.orders.list)
  const [reviewTarget, setReviewTarget] = useState(null)
  const orderFromList = list.items.find((item) => String(item.id) === id)
  const needsFetch = orderFromList === undefined

  useEffect(() => {
    if (needsFetch && detail.id !== id) dispatch(fetchOrder({ token, id }))
  }, [dispatch, token, id, needsFetch, detail.id])

  const handleRetry = () => {
    dispatch(fetchOrder({ token, id }))
  }

  if (needsFetch && (detail.id !== id || detail.loading)) return <div className="skel order-detail-skeleton" />

  if (needsFetch && detail.error) return <EmptyState title="No pudimos cargar la compra" text={detail.error} actionLabel="Reintentar" onAction={handleRetry} />

  const order = needsFetch ? detail.order : orderFromList

  return (
    <>
      <OrderDetail order={order} onReview={setReviewTarget} />
      {reviewTarget && (
        <ReviewModal target={reviewTarget} onClose={() => setReviewTarget(null)} />
      )}
    </>
  )
}

export default OrderDetailContainer
