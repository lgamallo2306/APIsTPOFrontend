import Stars from './Stars'
import './ReviewSummary.css'

function ReviewSummary({ reviews }) {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  const average = total / reviews.length

  return (
    <div className="review-summary">
      <span className="h2">{average.toFixed(1)}</span>
      <Stars rating={average} />
      <span className="small muted">{reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}</span>
    </div>
  )
}

export default ReviewSummary
