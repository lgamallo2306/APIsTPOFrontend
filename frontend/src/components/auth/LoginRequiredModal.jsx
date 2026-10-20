import { useNavigate } from 'react-router-dom'
import Modal from '../ui/Modal'


function LoginRequiredModal({ from, onClose }) {
  const navigate = useNavigate()

  return (
    <Modal title="Ingresá para comprar" onClose={onClose}>
      <p className="muted">Para agregar productos al carrito necesitás una cuenta. Cuando ingreses, volvés a este producto.</p>
      <div className="modal-actions">
        <button type="button" className="btn btn-ghost" onClick={onClose}>Seguir mirando</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/registro', { state: { from } })}>Crear cuenta</button>
        <button type="button" className="btn btn-primary" onClick={() => navigate('/login', { state: { from } })}>Ingresar</button>
      </div>
    </Modal>
  )
}

export default LoginRequiredModal