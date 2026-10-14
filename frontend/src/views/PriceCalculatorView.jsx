import PriceCalculator from '../components/seller/PriceCalculator'
import './PriceCalculatorView.css'

function PriceCalculatorView({ token }) {
  return (
    <main className="calculator-view">
      <div className="calculator-view-title">
        <span className="eyebrow">Panel vendedor</span>
        <h1 className="h1">Calculadora de precio sugerido</h1>
      </div>
      <PriceCalculator token={token} />
    </main>
  )
}

export default PriceCalculatorView
