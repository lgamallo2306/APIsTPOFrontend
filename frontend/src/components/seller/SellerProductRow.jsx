import PriceTag from '../products/PriceTag'
import SellerProductActions from './SellerProductActions'
import './SellerProductRow.css'

function SellerProductRow({ product, onStock, onDiscount, onDelete }) {
  const image = product.imageUrls.length > 0 ? product.imageUrls[0] : null

  return (
    <tr>
      <td>
        <div className="seller-product-row-info">
          <div className="pimg bed seller-product-row-img">
            {image && <img src={image} alt={product.name} />}
          </div>
          <div>
            <p className="seller-product-row-name">{product.name}</p>
            <p className="small muted">{product.categoryName} · <span className="mono">#{product.id}</span></p>
          </div>
        </div>
      </td>
      <td>
        <PriceTag price={product.price} discount={product.discount} />
      </td>
      <td>
        {product.discount > 0 ? <span className="badge b-off">-{product.discount}%</span> : <span className="muted">—</span>}
      </td>
      <td>
        {product.stock === 0 && <span className="badge b-nostock">Sin stock</span>}
        {product.stock > 0 && <span className={product.stock <= 3 ? 'badge b-low' : 'mono'}>{product.stock} u.</span>}
      </td>
      <td className="num">
        <SellerProductActions product={product} onStock={onStock} onDiscount={onDiscount} onDelete={onDelete} />
      </td>
    </tr>
  )
}

export default SellerProductRow
