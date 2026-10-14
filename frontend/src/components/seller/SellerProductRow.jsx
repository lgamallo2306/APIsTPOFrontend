import { Link } from 'react-router-dom'
import PriceTag from '../products/PriceTag'
import StockBadge from '../products/StockBadge'
import './SellerProductRow.css'

function SellerProductRow({ product }) {
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
            <p className="small muted">{product.categoryName}</p>
          </div>
        </div>
      </td>
      <td className="num seller-product-row-price">
        <PriceTag price={product.price} discount={product.discount} />
      </td>
      <td className="num">
        <div className="seller-product-row-stock">
          <StockBadge stock={product.stock} />
          <span className="mono">{product.stock}</span>
        </div>
      </td>
      <td className="num">
        <Link to={`/vendedor/productos/${product.id}`} className="btn btn-ghost btn-sm">Editar</Link>
      </td>
    </tr>
  )
}

export default SellerProductRow