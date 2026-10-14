import './SalesMetrics.css'
import './SalesSkeleton.css'

const METRICS = [1, 2, 3]
const ROWS = [1, 2, 3, 4]

function SalesSkeleton() {
  return (
    <>
      <div className="sales-metrics">
        {METRICS.map((metric, index) => (
          <div key={index} className="skel sales-skeleton-metric" />
        ))}
      </div>
      <div className="card sales-skeleton-table">
        {ROWS.map((row, index) => (
          <div key={index} className="skel sales-skeleton-row" />
        ))}
      </div>
    </>
  )
}

export default SalesSkeleton
