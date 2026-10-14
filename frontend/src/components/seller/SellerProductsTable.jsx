import SellerProductRow from './SellerProductRow'
import './SellerProductsTable.css'

function SellerProductsTable({ products }) {
  return (
    <div className="card seller-products-table">
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th className="num">Precio</th>
            <th className="num">Stock</th>
            <th className="num"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <SellerProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SellerProductsTable