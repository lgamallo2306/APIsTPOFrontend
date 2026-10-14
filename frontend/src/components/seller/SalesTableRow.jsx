import { useState } from 'react'
import { formatPrice, formatDate } from '../../utils/format'
import SalesOrderItems from './SalesOrderItems'
import './SalesTableRow.css'

function SalesTableRow({ order }) {
  const [open, setOpen] = useState(false)

  const units = order.items.reduce((count, item) => count + item.quantity, 0)

  return (
    <>
      <tr className={open ? 'sales-table-row-open' : ''}>
        <td className="mono sales-table-row-id">#{order.id}</td>
        <td>{formatDate(order.date)}</td>
        <td>{order.email}</td>
        <td className="num">{units}</td>
        <td className="num sales-table-row-total">{formatPrice(order.total)}</td>
        <td className="num">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen(!open)}>
            {open ? 'Ocultar' : 'Ver'}
          </button>
        </td>
      </tr>
      {open && <SalesOrderItems items={order.items} />}
    </>
  )
}

export default SalesTableRow
