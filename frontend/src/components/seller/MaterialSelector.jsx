import { formatPrice } from '../../utils/format'
import './MaterialSelector.css'

function MaterialSelector({ materials, loading, error, selected, onSelect }) {
  return (
    <fieldset className="material-selector">
      <legend className="label material-selector-legend">Material</legend>
      {loading && <p className="muted">Cargando materiales…</p>}
      {error && <p className="alert-err">{error}</p>}
      <div className="material-selector-options">
        {materials.map((material) => (
          <button key={material.name} type="button" className={material.name === selected ? 'segopt on' : 'segopt'}
            onClick={() => onSelect(material.name)}>
            <span className="mono material-selector-name">{material.name}</span>
            <span className="small muted">{formatPrice(material.pricePerKg)}/kg</span>
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export default MaterialSelector
