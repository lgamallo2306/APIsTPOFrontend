import { useState } from 'react'
import Modal from '../ui/Modal'

function ProfileNameModal({ user, error, onSave, onClose }) {
  const [form, setForm] = useState({ name: user.name, surname: user.surname })
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name.trim() === '' || form.surname.trim() === '') {
      setValidation('El nombre y el apellido son obligatorios.')
      return
    }
    onSave({ name: form.name.trim(), surname: form.surname.trim() })
  }

  return (
    <Modal title="Editar nombre" onClose={onClose}>
      <form className="profile-modal-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="profile-name">Nombre</label>
          <input id="profile-name" className="input" type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="profile-surname">Apellido</label>
          <input id="profile-surname" className="input" type="text" name="surname" value={form.surname} onChange={handleChange} />
        </div>
        {(validation || error) && <p className="alert-err">{validation || error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar</button>
        </div>
      </form>
    </Modal>
  )
}

export default ProfileNameModal
