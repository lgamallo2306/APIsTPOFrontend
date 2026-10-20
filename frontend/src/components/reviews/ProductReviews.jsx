import Reviews from './Reviews'
import './ProductReviews.css'

function ProductReviews({ product, token, user, onLogout }) {
  return (
    <section className="product-reviews">
      <Reviews title="Opiniones del producto" type="product" id={product.id} token={token} user={user} onLogout={onLogout} />
      {product.sellerId !== null && (
        <Reviews title={`Opiniones de ${product.sellerName}`} type="seller" id={product.sellerId} token={token} user={user} onLogout={onLogout} />
      )}
    </section>
  )
}

export default ProductReviews
