import { formatPrice } from '../../utils/format'
import './CalculatorRow.css'

function CalculatorRow({ label, detail, amount, total }) {
  return (
    <div className={total ? 'kv calculator-row calculator-row-total' : 'kv calculator-row'}>
      <span className="calculator-row-label">
        {label}
        {detail && <span className="mono small muted">{detail}</span>}
      </span>
      <span>{formatPrice(amount)}</span>
    </div>
  )
}

export default CalculatorRow
