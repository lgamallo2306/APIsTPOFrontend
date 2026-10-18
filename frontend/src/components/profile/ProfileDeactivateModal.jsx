import { useState } from 'react'
import Modal from '../ui/Modal'
import PasswordInput from '../ui/PasswordInput'

// La baja se confirma con la contraseña; después se cierra la sesión
function ProfileDeactivateModal({ error, onConfirm, onClose }) {
  const [form, setForm] = useState({ password: '' })
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password === '') {
      setValidation('Ingresá tu contraseña para confirmar.')
      return
    }
    onConfirm(form)
  }

  return (
    <Modal title="Dar de baja la cuenta" onClose={onClose}>
      <form className="profile-modal-form" onSubmit={handleSubmit}>
        <p>Tu cuenta queda desactivada y se cierra la sesión. Un administrador puede reactivarla.</p>
        <div className="field">
          <label className="label" htmlFor="profile-deactivate-password">Contraseña</label>
          <PasswordInput id="profile-deactivate-password" name="password" value={form.password} onChange={handleChange} />
        </div>
        {(validation || error) && <p className="alert-err">{validation || error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-danger">Dar de baja</button>
        </div>
      </form>
    </Modal>
  )
}

export default ProfileDeactivateModal
