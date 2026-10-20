import { useState } from 'react'
import { createProductReview, createSellerReview } from '../../utils/api'
import Modal from '../ui/Modal'
import ReviewForm from './ReviewForm'
import ReviewSent from './ReviewSent'

function ReviewModal({ token, target, onClose, onLogout }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (form) => {
    if (form.rating === '') {
      setError('Elegí una calificación de 1 a 5 estrellas.')
      return
    }

    const review = { rating: Number(form.rating), comment: form.comment.trim() }
    setError('')
    setLoading(true)
    const request = target.type === 'product'
      ? createProductReview(token, target.id, review)
      : createSellerReview(token, target.id, review)
    request
      .then(() => {
        setLoading(false)
        setSent(true)
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) onLogout()
        setError(err.message)
        setLoading(false)
      })
  }

  const title = target.type === 'product' ? `Reseñar ${target.name}` : `Reseñar a ${target.name}`

  return (
    <Modal title={title} onClose={onClose}>
      {sent
        ? <ReviewSent onClose={onClose} />
        : <ReviewForm onSubmit={handleSubmit} onCancel={onClose} error={error} loading={loading} />}
    </Modal>
  )
}

export default ReviewModal
