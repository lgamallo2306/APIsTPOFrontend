import { useEffect } from 'react'
import './Toast.css'

// Aviso breve de éxito: se oculta solo a los 3 segundos o con la X
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <div className="toast toast-box" role="status">
      <span>{message}</span>
      <button type="button" className="toast-close" aria-label="Cerrar aviso" onClick={onClose}>×</button>
    </div>
  )
}

export default Toast
