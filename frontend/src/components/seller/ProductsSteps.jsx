import './ProductSteps.css'

const STEPS = [
  { number: 1, label: 'Datos del producto' },
  { number: 2, label: 'Imágenes' },
]


function ProductSteps({ step, canChoose, onChange }) {
  const stepClass = (number) => {
    if (number === step) return 'product-steps-button product-steps-active'
    if (number < step) return 'product-steps-button product-steps-done'
    return 'product-steps-button'
  }

  return (
    <nav className="product-steps" aria-label="Pasos para cargar el producto">
      <div className="product-steps-bar">
        <div className={step === 1 ? 'product-steps-fill product-steps-fill-half' : 'product-steps-fill'} />
      </div>
      <ol className="product-steps-list">
        {STEPS.map((item) => (
          <li key={item.number}>
            <button type="button" className={stepClass(item.number)} disabled={!canChoose} onClick={() => onChange(item.number)}>
              <span className="product-steps-number">{item.number < step ? '✓' : item.number}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default ProductSteps