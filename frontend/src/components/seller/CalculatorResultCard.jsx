import { formatPrice } from '../../utils/format'
import CalculatorRow from './CalculatorRow'
import './CalculatorResultCard.css'

function CalculatorResultCard({ result }) {
  if (!result) {
    return (
      <section className="card calculator-result">
        <span className="eyebrow">Desglose</span>
        <p className="muted">Completá los datos y tocá "Calcular precio" para ver el desglose.</p>
      </section>
    )
  }

  return (
    <section className="card calculator-result">
      <span className="eyebrow">Desglose</span>
      <CalculatorRow label="Costo de material" detail={`${result.weightGrams} g de ${result.material}`} amount={result.materialCost} />
      <CalculatorRow label="Costo de impresión" detail={`${result.printHours} h`} amount={result.printTimeCost} />
      <CalculatorRow label="Costo de producción" amount={result.productionCost} total />
      <CalculatorRow label={`Margen (${result.marginPercentage} %)`} amount={result.marginAmount} />
      <div className="calculator-result-price">
        <span className="calculator-result-label">Precio sugerido</span>
        <span className="price calculator-result-amount">{formatPrice(result.suggestedPrice)}</span>
      </div>
      <p className="note calculator-result-note">{result.note}</p>
    </section>
  )
}

export default CalculatorResultCard
