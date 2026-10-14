// max es opcional: sin max, el + no se deshabilita (el back valida el stock)
function QuantityStepper({ value, min, max, disabled, onChange }) {
  const atMax = max !== undefined && value >= max

  return (
    <div className="stepper">
      <button type="button" aria-label="Restar uno" disabled={disabled || value <= min} onClick={() => onChange(value - 1)}>−</button>
      <span className="v">{value}</span>
      <button type="button" aria-label="Sumar uno" disabled={disabled || atMax} onClick={() => onChange(value + 1)}>+</button>
    </div>
  )
}

export default QuantityStepper
