import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getProduct } from '../../utils/api'
import EmptyState from '../ui/EmptyState'
import ProductEditorPanel from './ProductEditorPanel'
import './ProductEditor.css'

const ERROR_CARGA = 'No pudimos traer el producto. Revisá tu conexión e intentá de nuevo.'

// Lee la URL y consigue el producto a editar. En el alta no hay producto
function ProductEditor({ user, token, categories, onLogout }) {
  const location = useLocation()
  const id = location.pathname.split('/')[3] // "/vendedor/productos/5" → "5" · "/vendedor/productos/nuevo" → "nuevo"
  const isNew = id === 'nuevo'
  const productFromList = location.state && location.state.product ? location.state.product : null
  const suggestedPrice = location.state && location.state.price ? location.state.price : null
  const [product, setProduct] = useState(productFromList)
  const [loading, setLoading] = useState(!isNew && productFromList === null)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (isNew) {
      setProduct(null)
      setLoading(false)
      return
    }
    if (productFromList !== null) {
      setProduct(productFromList)
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    getProduct(id)
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.status ? err.message : ERROR_CARGA)
        setLoading(false)
      })
  }, [id, isNew, productFromList, retry])

  if (loading) return <div className="skel product-editor-skeleton" />

  if (error) {
    return <EmptyState title="No pudimos cargar el producto" text={error} actionLabel="Reintentar" onAction={() => setRetry(retry + 1)} />
  }

  
  if (product && product.sellerId !== user.id && !user.roles.includes('ADMIN')) {
    return <EmptyState title="Este producto no es tuyo" text="Solo podés editar los productos que publicaste vos." />
  }

  return (
    <ProductEditorPanel
      token={token}
      categories={categories}
      onLogout={onLogout}
      product={product}
      suggestedPrice={isNew ? suggestedPrice : null}
      onProductChange={(updated) => setProduct(updated)}
    />
  )
}

export default ProductEditor
