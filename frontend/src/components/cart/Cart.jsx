import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, updateCartItem, clearCart } from '../../redux/cartSlice'
import CartContent from './CartContent'
import './Cart.css'
import { toast } from 'react-toastify'

// el carrito lo pide App una vez por token; acá solo se lee del slice y se despachan los cambios
function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const { cart, loading, error } = useSelector((state) => state.cart)
  const [updating, setUpdating] = useState(false)

  const handleRetry = () => {
    dispatch(fetchCart(token))
  }

  const handleQuantity = (productId, quantity) => {
    setUpdating(true)
    dispatch(updateCartItem({ token, item: { productId, quantity } })).then((result) => {
      setUpdating(false)
      if (result.error) toast.error(result.error.message)
    })
  }

  const handleClear = () => {
    setUpdating(true)
    dispatch(clearCart(token)).then((result) => {
      setUpdating(false)
      if (result.error) {
        toast.error(result.error.message)
        return
      }
      toast.info('Vaciaste el carrito')
    })
  }

  // la compra se confirma en la pantalla de pago (simulado), que es la que hace el checkout
  const handleCheckout = () => {
    navigate('/pago')
  }

  return (
    <section className="cart">
      <h1 className="h1">Carrito</h1>
      <CartContent cart={cart} loading={loading} error={error} updating={updating}
        onRetry={handleRetry} onQuantity={handleQuantity} onClear={handleClear} onCheckout={handleCheckout} />
    </section>
  )
}

export default Cart
