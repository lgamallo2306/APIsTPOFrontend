import { useState } from 'react'
import RatingInput from './RatingInput'
import './ReviewForm.css'

function ReviewForm({ onSubmit, onCancel, error, loading }) {
  const [form, setForm] = useState({ rating: '', comment: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <RatingInput value={form.rating} onChange={handleChange} />

      <div className="field">
        <label className="label" htmlFor="comment">Comentario (opcional)</label>
        <textarea id="comment" name="comment" className="input" rows="4" maxLength="1000"
          value={form.comment} onChange={handleChange} />
      </div>

      {error && <p className="alert-err">{error}</p>}

      <div className="modal-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Publicando…' : 'Publicar reseña'}
        </button>
      </div>
    </form>
  )
}

export default ReviewForm
