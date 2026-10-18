import { useState } from 'react'
import Modal from '../ui/Modal'
import PasswordInput from '../ui/PasswordInput'

function ProfilePasswordModal({ error, onSave, onClose }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' })
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.currentPassword === '' || form.newPassword === '') {
      setValidation('Completá las dos contraseñas.')
      return
    }
    onSave(form)
  }

  return (
    <Modal title="Cambiar contraseña" onClose={onClose}>
      <form className="profile-modal-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="profile-current-password">Contraseña actual</label>
          <PasswordInput id="profile-current-password" name="currentPassword" value={form.currentPassword} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="profile-new-password">Contraseña nueva</label>
          <PasswordInput id="profile-new-password" name="newPassword" value={form.newPassword} onChange={handleChange} />
        </div>
        {(validation || error) && <p className="alert-err">{validation || error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Cambiar contraseña</button>
        </div>
      </form>
    </Modal>
  )
}

export default ProfilePasswordModal
