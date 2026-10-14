import PriceTag from './PriceTag'
import StockBadge from './StockBadge'
import AddToCart from '../cart/AddToCart'
import './ProductInfo.css'

function ProductInfo({ product, token, onCartChange, onLogout }) {
  const image = product.imageUrls.length > 0 ? product.imageUrls[0] : null

  return (
    <>
      <div className="pimg bed product-info-img">
        {image && <img src={image} alt={product.name} />}
      </div>
      <div className="product-info-text">
        <span className="eyebrow">{product.categoryName}</span>
        <h1 className="h1">{product.name}</h1>
        <p className="small muted">Vendido por {product.sellerName}</p>
        <PriceTag price={product.price} discount={product.discount} />
        <StockBadge stock={product.stock} />
        <p className="product-info-description">{product.description}</p>
        <AddToCart product={product} token={token} onCartChange={onCartChange} onLogout={onLogout} />
      </div>
    </>
  )
}

export default ProductInfo
