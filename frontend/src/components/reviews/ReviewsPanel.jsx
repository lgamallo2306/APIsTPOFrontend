import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteReview } from '../../redux/reviewsSlice'
import ReviewsResults from './ReviewsResults'
import ReviewDeleteModal from './ReviewDeleteModal'

function ReviewsPanel({ loading, error, reviews, onRetry }) {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)
  const [selected, setSelected] = useState(null)
  const [deleteError, setDeleteError] = useState('')

  const openDelete = (review) => {
    setSelected(review)
    setDeleteError('')
  }

  const closeModal = () => {
    setSelected(null)
  }

  // el slice saca la reseña de la lista; acá solo se muestra el resultado
  const handleDelete = () => {
    dispatch(deleteReview({ token, id: selected.id })).then((result) => {
      if (result.error) {
        setDeleteError(result.error.message)
        return
      }
      toast.success('Reseña eliminada')
      closeModal()
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
