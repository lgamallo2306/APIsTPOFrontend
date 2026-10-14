import './Modal.css'

// Reemplaza a alert y confirm: el contenido llega por children y el cierre por onClose
function Modal({ title, onClose, children }) {
  return (
    <div className="overlay modal-overlay">
      <section className="modal modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 className="h2" id="modal-title">{title}</h2>
          <button type="button" className="btn btn-ghost btn-icon" aria-label="Cerrar" onClick={onClose}>×</button>
        </div>
        {children}
      </section>
    </div>
  )
}

export default Modal
