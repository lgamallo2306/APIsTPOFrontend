import { Link } from 'react-router-dom'
import PriceTag from './PriceTag'
import StockBadge from './StockBadge'
import AddToCart from '../cart/AddToCart'
import './ProductInfo.css'

function ProductInfo({ product }) {
  const image = product.imageUrls.length > 0 ? product.imageUrls[0] : null

  return (
    <>
      <div className="pimg bed product-info-img">
        {image && <img src={image} alt={product.name} />}
      </div>
      <div className="product-info-text">
        <div className="product-info-tags">
          <span className="badge product-info-category">{product.categoryName}</span>
          <StockBadge stock={product.stock} />
        </div>
        <h1 className="h1 product-info-title">{product.name}</h1>
        <p className="small muted">Vendido por {product.sellerId !== null
          ? <Link to={`/vendedores/${product.sellerId}`}><strong>{product.sellerName}</strong></Link>
          : <strong>{product.sellerName}</strong>}</p>
        <PriceTag price={product.price} discount={product.discount} large />
        <div className="divider" />
        <AddToCart product={product} />
        <div className="product-info-description">
          <h2 className="h3">Descripción</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </>
  )
}

export default ProductInfo
