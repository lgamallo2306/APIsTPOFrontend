import { Link } from 'react-router-dom'
import PriceTag from './PriceTag'
import StockBadge from './StockBadge'
import './ProductCard.css'

function ProductCard({ product }) {
  const image = product.imageUrls.length > 0 ? product.imageUrls[0] : null

  return (
    <Link to={`/productos/${product.id}`} className={product.stock === 0 ? 'pcard product-card-off' : 'pcard'}>
      <div className="product-card-media">
        <div className="product-card-badges">
          <StockBadge stock={product.stock} />
        </div>
        <div className="pimg bed product-card-img">
          {image && <img src={image} alt={product.name} />}
        </div>
      </div>
      <div className="product-card-body">
        <span className="eyebrow product-card-category">{product.categoryName}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <PriceTag price={product.price} discount={product.discount} />
      </div>
    </Link>
  )
}

export default ProductCard
