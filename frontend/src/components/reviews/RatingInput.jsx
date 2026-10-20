import './RatingInput.css'

const STARS = [1, 2, 3, 4, 5]

function RatingInput({ value, onChange }) {
  return (
    <fieldset className="rating-input">
      <legend className="label">Calificación</legend>
      <div className="rating-input-stars">
        {STARS.map((star) => (
          <label key={star} className={star <= Number(value) ? 'rating-input-star rating-input-on' : 'rating-input-star'}>
            <input type="radio" name="rating" value={star} checked={Number(value) === star} onChange={onChange}
              aria-label={`${star} de 5 estrellas`} />
            ★
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default RatingInput
