import SalesTableRow from './SalesTableRow'
import './SalesTable.css'

function SalesTable({ sales }) {
  return (
    <div className="card sales-table">
      <table className="table">
        <thead>
          <tr>
            <th>Orden</th>
            <th>Fecha</th>
            <th>Comprador</th>
            <th className="num">Ítems</th>
            <th className="num">Total</th>
            <th className="num"></th>
          </tr>
        </thead>
        <tbody>
          {sales.map((order) => (
            <SalesTableRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable
