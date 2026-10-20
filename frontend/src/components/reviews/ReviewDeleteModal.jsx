import Modal from '../ui/Modal'

function ReviewDeleteModal({ review, own, error, onConfirm, onClose }) {
  if (error) {
    return (
      <Modal title="No se pudo eliminar" onClose={onClose}>
        <p className="alert-err">{error}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-primary" onClick={onClose}>Entendido</button>
        </div>
      </Modal>
    )
  }

  return (
    <Modal title="Eliminar reseña" onClose={onClose}>
      <p>¿Seguro que querés eliminar {own ? 'tu reseña' : `la reseña de ${review.authorName}`}? No se puede deshacer.</p>
      <div className="modal-actions">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
      </div>
    </Modal>
  )
}

export default ReviewDeleteModal
