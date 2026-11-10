import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addCartItem } from '../../redux/cartSlice'
import QuantityStepper from '../ui/QuantityStepper'
import './AddToCart.css'
import LoginRequiredModal from '../auth/LoginRequiredModal'

function AddToCart({ product, token }) {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [askLogin, setAskLogin] = useState(false)

  // el slice guarda el carrito que devuelve el back, así el contador del Header se actualiza solo
  const handleClick = () => {
    if (!token) {
      setAskLogin(true)
      return
    }
    setLoading(true)
    dispatch(addCartItem({ token, item: { productId: product.id, quantity } })).then((result) => {
      setLoading(false)
      if (result.error) {
        toast.error(result.error.message)
        return
      }
      // el aviso puede llevar JSX: así incluye el link al carrito
      toast.success(<span>Agregado al carrito. <Link to="/carrito">Ver carrito</Link></span>)
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
