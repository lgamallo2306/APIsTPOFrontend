import SellerLayout from '../components/seller/SellerLayout'
import PriceCalculator from '../components/seller/PriceCalculator'

function PriceCalculatorView({ token }) {
  return (
    <SellerLayout title="Calculadora de precio sugerido">
      <PriceCalculator token={token} />
    </SellerLayout>
  )
}

export default PriceCalculatorView
