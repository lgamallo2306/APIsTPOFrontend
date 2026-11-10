import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, getSellerReviews } from '../../redux/reviewsSlice'
import ReviewsPanel from './ReviewsPanel'
import './Reviews.css'

// type es 'product' o 'seller': elige el thunk y la parte del slice (state.reviews.product / .seller)
function Reviews({ title, type, id, token, user }) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.reviews[type])

  const handleRetry = () => {
    dispatch(type === 'product' ? getProductReviews(id) : getSellerReviews(id))
  }

  // solo se piden si las guardadas no son de este producto / vendedor
  useEffect(() => {
    if (data.id !== id) dispatch(type === 'product' ? getProductReviews(id) : getSellerReviews(id))
  }, [dispatch, type, id, data.id])

  const loading = data.id !== id || data.loading

  return (
    <section className="reviews">
      <h2 className="h2">{title}</h2>
      <ReviewsPanel
        token={token}
        user={user}
        loading={loading}
        error={data.error}
        reviews={data.items}
        onRetry={handleRetry}
      />
    </section>
  )
}

export default Reviews
