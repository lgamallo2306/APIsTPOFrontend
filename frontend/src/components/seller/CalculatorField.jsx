import './CalculatorField.css'

function CalculatorField({ name, label, suffix, step, help, value, onChange }) {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>{label}</label>
      <div className="affix">
        <input id={name} name={name} type="number" min="0" step={step} className="input calculator-field-input"
          value={value} onChange={onChange} />
        <span className="suf">{suffix}</span>
      </div>
      {help && <span className="help">{help}</span>}
    </div>
  )
}

export default CalculatorField
