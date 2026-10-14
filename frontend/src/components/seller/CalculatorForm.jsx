import { useState } from 'react'
import MaterialSelector from './MaterialSelector'
import CalculatorField from './CalculatorField'
import './CalculatorForm.css'

function CalculatorForm({ materials, loadingMaterials, materialsError, error, loading, onSubmit }) {
  const [form, setForm] = useState({ material: '', weightGrams: '', printHours: '', marginPercentage: '' })
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.material === '') {
      setValidation('Elegí un material.')
      return
    }
    if (form.weightGrams === '' || Number(form.weightGrams) <= 0) {
      setValidation('El peso tiene que ser mayor a 0.')
      return
    }
    if (Number(form.printHours) < 0 || Number(form.marginPercentage) < 0) {
      setValidation('Las horas y el margen no pueden ser negativos.')
      return
    }
    setValidation('')
    onSubmit(form)
  }

  return (
    <form className="card calculator-form" onSubmit={handleSubmit}>
      <p className="muted">Elegí el material y cargá peso y horas de la pieza. El servidor calcula el costo y te sugiere un precio de venta.</p>
      <MaterialSelector materials={materials} loading={loadingMaterials} error={materialsError} selected={form.material}
        onSelect={(name) => setForm({ ...form, material: name })} />
      <div className="calculator-form-fields">
        <CalculatorField name="weightGrams" label="Peso" suffix="g" step="1" value={form.weightGrams} onChange={handleChange} />
        <CalculatorField name="printHours" label="Horas de impresión (opcional)" suffix="h" step="0.1"
          value={form.printHours} onChange={handleChange} />
        <CalculatorField name="marginPercentage" label="Margen (opcional)" suffix="%" step="1" help="Por defecto 30 %"
          value={form.marginPercentage} onChange={handleChange} />
      </div>
      {(validation || error) && <p className="alert-err">{validation || error}</p>}
      <button type="submit" className="btn btn-dark calculator-form-submit" disabled={loading}>
        {loading ? 'Calculando…' : 'Calcular precio'}
      </button>
    </form>
  )
}

export default CalculatorForm
