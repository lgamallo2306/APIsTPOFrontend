import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addCartItem } from '../../utils/api'
import QuantityStepper from '../ui/QuantityStepper'
import './AddToCart.css'

function AddToCart({ product, token, onCartChange, onLogout }) {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  const handleClick = () => {
    if (!token) {
      navigate('/login')
      return
    }
    setLoading(true)
    setAdded(false)
    setError('')
    addCartItem(token, { productId: product.id, quantity })
      .then((cart) => {
        onCartChange(cart, product)
        setAdded(true)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        if (err.status === 401 || err.status === 403) {
          onLogout()
          navigate('/login')
          return
        }
        setError(err.message)
      })
  }

  return (
    <div className="add-to-cart">
      {product.stock > 0 && (
        <div className="add-to-cart-quantity">
          <span className="label">Cantidad</span>
          <QuantityStepper value={quantity} min={1} max={product.stock} disabled={loading} onChange={setQuantity} />
        </div>
      )}
      <button type="button" className="btn btn-primary btn-lg" disabled={product.stock === 0 || loading} onClick={handleClick}>
        {loading ? 'Agregando…' : 'Agregar al carrito'}
      </button>
      {added && <p className="alert-info">Agregado al carrito. <Link to="/carrito">Ver carrito</Link></p>}
      {error && <p className="alert-err">{error}</p>}
    </div>
  )
}

export default AddToCart
