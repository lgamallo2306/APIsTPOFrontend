import Modal from '../ui/Modal'


function ProductDeleteModal({ product, error, onConfirm, onClose }) {
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
    <Modal title="Eliminar producto" onClose={onClose}>
      <p>¿Seguro que querés eliminar “{product.name}”? Deja de aparecer en el catálogo.</p>
      <div className="modal-actions">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
      </div>
    </Modal>
  )
}

export default ProductDeleteModal
