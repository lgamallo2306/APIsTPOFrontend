import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getProduct } from '../../utils/api'
import EmptyState from '../ui/EmptyState'
import ProductInfo from './ProductInfo'
import './ProductDetail.css'

const ERROR_CARGA = 'No pudimos traer el producto. Revisá tu conexión e intentá de nuevo.'

function ProductDetail({ token, onCartChange, onLogout }) {
  const location = useLocation()
  const id = location.pathname.split('/')[2] // "/productos/5" → "5"
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.status ? err.message : ERROR_CARGA)
        setLoading(false)
      })
  }, [id, retry])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetry(retry + 1)
  }

  if (loading) return <section className="product-detail"><div className="skel product-detail-skeleton" /></section>

  if (error) return <EmptyState title="No pudimos cargar el producto" text={error} actionLabel="Reintentar" onAction={handleRetry} />

  return (
    <section className="product-detail">
      <ProductInfo product={product} token={token} onCartChange={onCartChange} onLogout={onLogout} />
    </section>
  )
}

export default ProductDetail
