import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateCartItem, clearCart, checkout } from '../../utils/api'
import CartContent from './CartContent'
import './Cart.css'
import { toast } from 'react-toastify'

function Cart({ cart, error, onRetry, token, onCartChange, onLogout }) {
  const navigate = useNavigate()
  const [updating, setUpdating] = useState(false)
  


  const handleFail = (err) => {
    setUpdating(false)
    if (err.status === 401 || err.status === 403) onLogout()
    toast.error(err.message)
  }


  const handleQuantity = (productId, quantity) => {
    setUpdating(true)
    updateCartItem(token, { productId, quantity })
      .then((data) => {
        onCartChange(data)
        setUpdating(false)
      })
      .catch(handleFail)
  }


  const handleClear = () => {
    clearCart(token)
      .then(() => {
        onCartChange({ ...cart, items: [], total: 0 })
        setUpdating(false)
        toast.info('Vaciaste el carrito')
      })
      .catch(handleFail)
  }

  
  const handleCheckout = () => {
    setUpdating(true)
    checkout(token)
      .then((order) => {
        onCartChange({ ...cart, items: [], total: 0 })
        navigate(`/compra/${order.id}/confirmada`, { state: { order } })
      })
      .catch(handleFail)
  }

  return (
    <section className="cart">
      <h1 className="h1">Carrito</h1>
      <CartContent cart={cart} error={error} updating={updating}
        onRetry={onRetry} onQuantity={handleQuantity} onClear={handleClear} onCheckout={handleCheckout} />
    </section>
  )
}

export default Cart
