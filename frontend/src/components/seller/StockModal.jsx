import { useState } from 'react'
import Modal from '../ui/Modal'
import './ProductModal.css'

// Se carga la cantidad disponible nueva; el panel calcula cuánto sumar o restar
function StockModal({ product, error, onSave, onClose }) {
  const [form, setForm] = useState({ stock: String(product.stock) })
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const stock = Number(form.stock)
    if (form.stock === '' || stock < 0) {
      setValidation('El stock tiene que ser 0 o mayor.')
      return
    }
    if (stock === product.stock) {
      onClose()
      return
    }
    onSave(stock)
  }

  return (
    <Modal title="Ajustar stock" onClose={onClose}>
      <form className="product-modal-form" onSubmit={handleSubmit}>
        <p className="muted">{product.name}</p>
        <div className="field">
          <label className="label" htmlFor="stock-quantity">Cantidad disponible</label>
          <input id="stock-quantity" className="input" type="number" min="0" step="1" name="stock" value={form.stock} onChange={handleChange} />
          <span className="help">Stock actual: {product.stock}. Se reemplaza por el valor nuevo.</span>
        </div>
        {(validation || error) && <p className="alert-err">{validation || error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar stock</button>
        </div>
      </form>
    </Modal>
  )
}

export default StockModal
