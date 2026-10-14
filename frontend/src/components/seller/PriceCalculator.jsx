import { useState, useEffect } from 'react'
import { getMaterials, estimatePrice } from '../../utils/api'
import CalculatorForm from './CalculatorForm'
import CalculatorResultCard from './CalculatorResultCard'
import './PriceCalculator.css'

function PriceCalculator({ token }) {
  const [materials, setMaterials] = useState([])
  const [loadingMaterials, setLoadingMaterials] = useState(true)
  const [materialsError, setMaterialsError] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getMaterials()
      .then((data) => {
        setMaterials(data)
        setLoadingMaterials(false)
      })
      .catch((err) => {
        setMaterialsError(err.message)
        setLoadingMaterials(false)
      })
  }, [])

  // el formulario ya validó los datos: acá solo se arma el body y se llama al back
  const handleCalculate = (form) => {
    setError('')
    setLoading(true)
    estimatePrice(token, {
      material: form.material,
      weightGrams: Number(form.weightGrams),
      printHours: form.printHours === '' ? null : Number(form.printHours),
      marginPercentage: form.marginPercentage === '' ? null : Number(form.marginPercentage),
    })
      .then((data) => {
        setResult(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  return (
    <div className="price-calculator">
      <CalculatorForm materials={materials} loadingMaterials={loadingMaterials} materialsError={materialsError}
        error={error} loading={loading} onSubmit={handleCalculate} />
      <CalculatorResultCard result={result} />
    </div>
  )
}

export default PriceCalculator
