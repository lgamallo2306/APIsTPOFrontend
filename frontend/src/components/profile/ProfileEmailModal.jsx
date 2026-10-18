import { useState } from 'react'
import Modal from '../ui/Modal'
import PasswordInput from '../ui/PasswordInput'

// El back pide la contraseña actual para confirmar el cambio
function ProfileEmailModal({ error, onSave, onClose }) {
  const [form, setForm] = useState({ newEmail: '', currentPassword: '' })
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.newEmail.trim() === '' || form.currentPassword === '') {
      setValidation('Completá el email nuevo y tu contraseña.')
      return
    }
    onSave({ newEmail: form.newEmail.trim(), currentPassword: form.currentPassword })
  }

  return (
    <Modal title="Cambiar email" onClose={onClose}>
      <form className="profile-modal-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="profile-new-email">Email nuevo</label>
          <input id="profile-new-email" className="input" type="email" name="newEmail" value={form.newEmail} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="profile-email-password">Contraseña actual</label>
          <PasswordInput id="profile-email-password" name="currentPassword" value={form.currentPassword} onChange={handleChange} />
        </div>
        {(validation || error) && <p className="alert-err">{validation || error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Cambiar email</button>
        </div>
      </form>
    </Modal>
  )
}

export default ProfileEmailModal
