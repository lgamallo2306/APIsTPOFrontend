import { formatPrice } from '../../utils/format'
import SalesMetricCard from './SalesMetricCard'
import './SalesMetrics.css'

function SalesMetrics({ sales }) {
  const units = sales.reduce((total, order) => total + order.items.reduce((count, item) => count + item.quantity, 0), 0)
  const amount = sales.reduce((total, order) => total + order.total, 0)

  return (
    <div className="sales-metrics">
      <SalesMetricCard label="Órdenes" value={sales.length} />
      <SalesMetricCard label="Unidades" value={units} />
      <SalesMetricCard label="Total vendido" value={formatPrice(amount)} />
    </div>
  )
}

export default SalesMetrics
