import { formatDate } from '../../utils/format'
import Stars from './Stars'
import './ReviewItem.css'

function ReviewItem({ review, canDelete, onDelete }) {
  return (
    <article className="review-item">
      <div className="review-item-head">
        <Stars rating={review.rating} />
        <span className="small muted">{review.authorName} · {formatDate(review.date)}</span>
        {canDelete && (
          <button type="button" className="btn btn-ghost btn-sm review-item-delete" onClick={() => onDelete(review)}>Eliminar</button>
        )}
      </div>
      {review.comment !== '' && <p>{review.comment}</p>}
    </article>
  )
}

export default ReviewItem
