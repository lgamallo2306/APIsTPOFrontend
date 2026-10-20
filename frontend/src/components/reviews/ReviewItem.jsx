import { formatDate } from '../../utils/format'
import Stars from './Stars'
import './ReviewItem.css'

function ReviewItem({ review }) {
  return (
    <article className="review-item">
      <div className="review-item-head">
        <Stars rating={review.rating} />
        <span className="small muted">{review.authorName} · {formatDate(review.date)}</span>
      </div>
      {review.comment !== '' && <p>{review.comment}</p>}
    </article>
  )
}

export default ReviewItem
