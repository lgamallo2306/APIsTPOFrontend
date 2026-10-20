function ReviewSent({ onClose }) {
  return (
    <>
      <p className="alert-info">¡Gracias! Tu reseña ya está publicada.</p>
      <button type="button" className="btn btn-primary" onClick={onClose}>Cerrar</button>
    </>
  )
}

export default ReviewSent
