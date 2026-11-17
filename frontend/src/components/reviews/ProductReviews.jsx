import Reviews from './Reviews'
import './ProductReviews.css'

function ProductReviews({ product }) {
  return (
    <section className="product-reviews">
      <Reviews title="Opiniones del producto" type="product" id={product.id} />
      {product.sellerId !== null && (
        <Reviews title={`Opiniones de ${product.sellerName}`} type="seller" id={product.sellerId} />
      )}
    </section>
  )
}

export default ProductReviews
