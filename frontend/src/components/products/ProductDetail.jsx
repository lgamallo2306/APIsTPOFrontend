import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../redux/productSlice'
import EmptyState from '../ui/EmptyState'
import BackButton from '../layout/BackButton'
import ProductInfo from './ProductInfo'
import ProductReviews from '../reviews/ProductReviews'
import './ProductDetail.css'

function ProductDetail({ token, user, onCartChange, onLogout }) {
  const location = useLocation()
  const id = location.pathname.split('/')[2] // "/productos/5" → "5"
  const dispatch = useDispatch()
  const detail = useSelector((state) => state.products.detail)

  useEffect(() => {
    if(detail.id !== id) dispatch(fetchProduct(id))
  }, [dispatch, id, detail.id])

  const handleRetry = () => {
    dispatch(fetchProduct(id))
  }

  const loading = detail.id !== id || detail.loading
  const error = detail.error
  const product = detail.product


  if (loading) {
    return (
      <section className="product-detail">
        <div className="product-detail-main">
          <div className="skel product-detail-skeleton" />
        </div>
      </section>
    )
  }

  if (error) return <EmptyState title="No pudimos cargar el producto" text={error} actionLabel="Reintentar" onAction={handleRetry} />

  return (
    <section className="product-detail">
      <div>
        <BackButton />
      </div>
      <div className="product-detail-main">
        <ProductInfo product={product} token={token} onCartChange={onCartChange} onLogout={onLogout} />
      </div>
      <ProductReviews product={product} token={token} user={user} onLogout={onLogout} />
    </section>
  )
}

export default ProductDetail
