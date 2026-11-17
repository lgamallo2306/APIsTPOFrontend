import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMaterials, estimatePrice } from '../../redux/salesSlice'
import CalculatorForm from './CalculatorForm'
import CalculatorResultCard from './CalculatorResultCard'
import './PriceCalculator.css'

function PriceCalculator() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const materials = useSelector((state) => state.sales.materials)
  const estimate = useSelector((state) => state.sales.estimate)

  useEffect(() => {
    if (materials.items.length === 0) dispatch(getMaterials())
  }, [dispatch, materials.items.length])

  const handleCalculate = (form) => {
    dispatch(estimatePrice({
      token,
      estimate: {
        material: form.material,
        weightGrams: Number(form.weightGrams),
        printHours: form.printHours === '' ? null : Number(form.printHours),
        marginPercentage: form.marginPercentage === '' ? null : Number(form.marginPercentage),
      },
    }))
  }

  return (
    <div className="price-calculator">
      <CalculatorForm materials={materials.items} loadingMaterials={materials.loading} materialsError={materials.error}
        error={estimate.error} loading={estimate.loading} onSubmit={handleCalculate} />
      <CalculatorResultCard result={estimate.result} />
    </div>
  )
}

export default PriceCalculator
