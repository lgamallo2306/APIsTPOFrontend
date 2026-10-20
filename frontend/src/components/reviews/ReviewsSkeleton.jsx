import './ReviewsSkeleton.css'

const ROWS = [1, 2, 3]

function ReviewsSkeleton() {
  return (
    <div className="reviews-skeleton" aria-label="Cargando reseñas">
      {ROWS.map((row, index) => (
        <div key={index} className="reviews-skeleton-row">
          <div className="skel reviews-skeleton-stars" />
          <div className="skel reviews-skeleton-text" />
        </div>
      ))}
    </div>
  )
}

export default ReviewsSkeleton
