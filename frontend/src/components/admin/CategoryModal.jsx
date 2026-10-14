import { useState } from 'react'
import Modal from '../ui/Modal'

// Alta y edición: el mismo formulario. category es null cuando se crea una nueva
function CategoryModal({ category, error, onSave, onClose }) {
  const [form, setForm] = useState({ description: category ? category.description : '' })
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.description.trim() === '') {
      setValidation('La descripción es obligatoria.')
      return
    }
    onSave({ description: form.description.trim() })
  }

  return (
    <Modal title={category ? 'Editar categoría' : 'Nueva categoría'} onClose={onClose}>
      <form className="category-modal-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="category-description">Descripción</label>
          <input
            id="category-description"
            className="input"
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
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

export default CategoryModal
