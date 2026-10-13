import './PriceFilter.css'

function PriceFilter({ minPrice, maxPrice, onChange }) {
  return (
    <fieldset className="price-filter">
      <legend className="label">Precio</legend>
      <div className="price-filter-inputs">
        <div className="field">
          <label className="label" htmlFor="minPrice">Mínimo</label>
          <input id="minPrice" name="minPrice" type="number" min="0" className="input" value={minPrice} onChange={onChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="maxPrice">Máximo</label>
          <input id="maxPrice" name="maxPrice" type="number" min="0" className="input" value={maxPrice} onChange={onChange} />
        </div>
      </div>
    </fieldset>
  )
}

export default PriceFilter
