import { Link } from 'react-router-dom'
import './SellerProductActions.css'

// El producto viaja en el state del Link: el formulario de edición lo usa sin pedirlo de nuevo al back
function SellerProductActions({ product, onStock, onDiscount, onDelete }) {
  return (
    <div className="seller-product-actions">
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => onStock(product)}>Stock</button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => onDiscount(product)}>Descuento</button>
      <Link to={`/vendedor/productos/${product.id}`} state={{ product }} className="btn btn-ghost btn-sm">Editar</Link>
      <button type="button" className="btn btn-ghost btn-sm seller-product-actions-delete" onClick={() => onDelete(product)}>
        Eliminar
      </button>
    </div>
  )
}

export default SellerProductActions
