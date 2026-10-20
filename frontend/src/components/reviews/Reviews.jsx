import { useState, useEffect } from 'react'
import { getProductReviews, getSellerReviews } from '../../utils/api'
import ReviewsPanel from './ReviewsPanel'
import './Reviews.css'

const ERROR_CARGA = 'No pudimos traer las reseñas. Revisá tu conexión e intentá de nuevo en unos segundos.'

function Reviews({ title, type, id, token, user, onLogout }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError('')
    const request = type === 'product' ? getProductReviews(id) : getSellerReviews(id)
    request
      .then((data) => {
        setReviews(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.status && err.message ? err.message : ERROR_CARGA)
        setLoading(false)
      })
  }, [type, id, retry])

  const handleRetry = () => {
    setRetry(retry + 1)
  }

  const handleDeleted = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId))
  }

  return (
    <section className="reviews">
      <h2 className="h3">{title}</h2>
      <ReviewsPanel
        token={token}
        user={user}
        onLogout={onLogout}
        loading={loading}
        error={error}
        reviews={reviews}
        onRetry={handleRetry}
        onDeleted={handleDeleted}
      />
    </section>
  )
}

export default Reviews
