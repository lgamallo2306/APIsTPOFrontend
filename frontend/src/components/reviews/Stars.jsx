import './Stars.css'

const STARS = [1, 2, 3, 4, 5]

function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} de 5 estrellas`}>
      {STARS.map((star) => (
        <span key={star} className={star <= Math.round(rating) ? 'stars-on' : 'stars-off'}>★</span>
      ))}
    </span>
  )
}

export default Stars
