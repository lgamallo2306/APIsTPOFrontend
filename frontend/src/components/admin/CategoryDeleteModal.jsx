import Modal from '../ui/Modal'

// Si el back rechaza el borrado (409, la categoría tiene productos), solo se muestra el mensaje y "Entendido"
function CategoryDeleteModal({ category, error, onConfirm, onClose }) {
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
    <Modal title="Eliminar categoría" onClose={onClose}>
      <p>¿Seguro que querés eliminar “{category.description}”?</p>
      <div className="modal-actions">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
      </div>
    </Modal>
  )
}

export default CategoryDeleteModal
