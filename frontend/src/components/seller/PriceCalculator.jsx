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

  const handleCalculate = (form) => {
    if (form.material === '') {
      setError('Elegí un material.')
      return
    }
    if (form.weightGrams === '' || Number(form.weightGrams) <= 0) {
      setError('El peso tiene que ser mayor a 0.')
      return
    }
    if (Number(form.printHours) < 0 || Number(form.marginPercentage) < 0) {
      setError('Las horas y el margen no pueden ser negativos.')
      return
    }

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
