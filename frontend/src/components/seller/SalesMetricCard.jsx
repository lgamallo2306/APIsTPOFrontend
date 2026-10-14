import './SalesMetricCard.css'

function SalesMetricCard({ label, value }) {
  return (
    <div className="card sales-metric-card">
      <span className="eyebrow">{label}</span>
      <span className="price sales-metric-card-value">{value}</span>
    </div>
  )
}

export default SalesMetricCard
