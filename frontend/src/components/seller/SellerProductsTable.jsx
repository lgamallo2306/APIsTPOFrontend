import SellerProductRow from './SellerProductRow'
import './SellerProductsTable.css'

function SellerProductsTable({ products, onStock, onDiscount, onDelete }) {
  return (
    <div className="card seller-products-table">
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio final</th>
            <th>Descuento</th>
            <th>Stock</th>
            <th className="num">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <SellerProductRow
              key={product.id}
              product={product}
              onStock={onStock}
              onDiscount={onDiscount}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SellerProductsTable
