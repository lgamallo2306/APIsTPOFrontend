import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addCartItem } from '../../utils/api'
import QuantityStepper from '../ui/QuantityStepper'
import './AddToCart.css'
import LoginRequiredModal from '../auth/LoginRequiredModal'

function AddToCart({ product, token, onCartChange, onLogout }) {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [askLogin, setAskLogin] = useState(false)

  const handleClick = () => {
    if (!token) {
      setAskLogin(true)
      return
    }
    setLoading(true)
    addCartItem(token, { productId: product.id, quantity })
      .then((cart) => {
        onCartChange(cart, product)
        setLoading(false)
        // el aviso puede llevar JSX: así incluye el link al carrito
        toast.success(<span>Agregado al carrito. <Link to="/carrito">Ver carrito</Link></span>)
      })
      .catch((err) => {
        setLoading(false)
        if (err.status === 401 || err.status === 403) {
          onLogout()
          navigate('/login', { state: { from: `/productos/${product.id}` } })
          return
        }
        toast.error(err.message)
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
      {askLogin && <LoginRequiredModal from={`/productos/${product.id}`} onClose={() => setAskLogin(false)} />}
    </div>
  )
}

export default AddToCart