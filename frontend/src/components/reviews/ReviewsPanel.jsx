import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteReview } from '../../utils/api'
import ReviewsResults from './ReviewsResults'
import ReviewDeleteModal from './ReviewDeleteModal'

const ERROR_GENERICO = 'No pudimos eliminar la reseña. Intentá de nuevo en unos segundos.'

function ReviewsPanel({ token, user, onLogout, loading, error, reviews, onRetry, onDeleted }) {
  const [selected, setSelected] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  const openDelete = (review) => {
    setSelected(review)
    setDeleteError('')
  }

  const closeModal = () => {
    setSelected(null)
  }

  const handleDelete = () => {
    deleteReview(token, selected.id)
      .then(() => {
        onDeleted(selected.id)
        toast.success('Reseña eliminada')
        closeModal()
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) onLogout()
        setDeleteError(err.status && err.message ? err.message : ERROR_GENERICO)
      })
  }

  return (
    <>
      <ReviewsResults loading={loading} error={error} reviews={reviews} user={user} onRetry={onRetry} onDelete={openDelete} />
      {selected && <ReviewDeleteModal review={selected} own={selected.authorId === user.id} error={deleteError} onConfirm={handleDelete} onClose={closeModal} />}
    </>
  )
}

export default ReviewsPanel
