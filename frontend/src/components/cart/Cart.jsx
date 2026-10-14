import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateCartItem, clearCart, checkout } from '../../utils/api'
import CartContent from './CartContent'
import './Cart.css'

function Cart({ cart, products, error, onRetry, token, onCartChange, onLogout }) {
  const navigate = useNavigate()
  const [updating, setUpdating] = useState(false)
  const [actionError, setActionError] = useState('')

  // 409 (sin stock, carrito vacío): se muestra el mensaje del back
  const handleFail = (err) => {
    setUpdating(false)
    if (err.status === 401 || err.status === 403) onLogout()
    setActionError(err.message)
  }

  const start = () => {
    setUpdating(true)
    setActionError('')
  }

  // quantity 0 elimina el ítem
  const handleQuantity = (productId, quantity) => {
    start()
    updateCartItem(token, { productId, quantity })
      .then((data) => {
        onCartChange(data)
        setUpdating(false)
      })
      .catch(handleFail)
  }

  // DELETE /cart responde 204 sin cuerpo: el carrito vacío se arma acá
  const handleClear = () => {
    start()
    clearCart(token)
      .then(() => {
        onCartChange({ ...cart, items: [], total: 0 })
        setUpdating(false)
      })
      .catch(handleFail)
  }

  // el back vacía el carrito al confirmar, así que se vacía también acá sin pedirlo de nuevo
  const handleCheckout = () => {
    start()
    checkout(token)
      .then((order) => {
        onCartChange({ ...cart, items: [], total: 0 })
        // la orden viaja con la navegación: la confirmación la muestra sin volver a pedirla
        navigate(`/compra/${order.id}/confirmada`, { state: { order } })
      })
      .catch(handleFail)
  }

  return (
    <section className="cart">
      <h1 className="h1">Carrito</h1>
      {actionError && <p className="alert-err">{actionError}</p>}
      <CartContent cart={cart} products={products} error={error} updating={updating}
        onRetry={onRetry} onQuantity={handleQuantity} onClear={handleClear} onCheckout={handleCheckout} />
    </section>
  )
}

export default Cart
