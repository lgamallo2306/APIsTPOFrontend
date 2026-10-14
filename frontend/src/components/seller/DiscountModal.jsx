import { useState } from 'react'
import Modal from '../ui/Modal'
import PriceTag from '../products/PriceTag'
import './ProductModal.css'

const QUICK_OPTIONS = [0, 10, 15, 20, 30]

function DiscountModal({ product, error, onSave, onClose }) {
  const [form, setForm] = useState({ discount: String(product.discount) })
  const [validation, setValidation] = useState('')

  const discount = Number(form.discount)
  const isValid = form.discount !== '' && discount >= 0 && discount <= 100

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) {
      setValidation('El descuento tiene que estar entre 0 y 100.')
      return
    }
    onSave(discount)
  }

  return (
    <Modal title="Aplicar descuento" onClose={onClose}>
      <form className="product-modal-form" onSubmit={handleSubmit}>
        <p className="muted">{product.name}</p>
        <div className="field">
          <label className="label" htmlFor="discount-value">Descuento (0–100 %)</label>
          <div className="affix">
            <input id="discount-value" className="input" type="number" min="0" max="100" name="discount" value={form.discount} onChange={handleChange} />
            <span className="suf">%</span>
          </div>
        </div>
        <div className="product-modal-options">
          {QUICK_OPTIONS.map((option) => (
            <button key={option} type="button" className="chip" onClick={() => setForm({ discount: String(option) })}>
              {option}%
            </button>
          ))}
        </div>
        <div className="note product-modal-preview">
          <span>Precio final</span>
          {isValid && <PriceTag price={product.price} discount={discount} />}
        </div>
        {(validation || error) && <p className="alert-err">{validation || error}</p>}
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Aplicar descuento</button>
        </div>
      </form>
    </Modal>
  )
}

export default DiscountModal
