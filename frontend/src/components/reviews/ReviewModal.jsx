import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createProductReview, createSellerReview } from '../../redux/reviewsSlice'
import Modal from '../ui/Modal'
import ReviewForm from './ReviewForm'
import ReviewSent from './ReviewSent'

function ReviewModal({ token, target, onClose }) {
  const dispatch = useDispatch()
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
    const action = target.type === 'product'
      ? createProductReview({ token, id: target.id, review })
      : createSellerReview({ token, id: target.id, review })
    // un 409 (no compró o ya reseñó) llega como error y se muestra en el formulario
    dispatch(action).then((result) => {
      setLoading(false)
      if (result.error) {
        setError(result.error.message)
        return
      }
      setSent(true)
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
