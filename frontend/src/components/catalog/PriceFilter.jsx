import './PriceFilter.css'

function PriceFilter({ minPrice, maxPrice, onChange }) {
  return (
    <fieldset className="price-filter">
      <legend className="label">Precio</legend>
      <div className="price-filter-inputs">
        <div className="affix">
          <span className="pre">$</span>
          <input name="minPrice" type="number" min="0" className="input" placeholder="Mín." aria-label="Precio mínimo" value={minPrice} onChange={onChange} />
        </div>
        <div className="affix">
          <span className="pre">$</span>
          <input name="maxPrice" type="number" min="0" className="input" placeholder="Máx." aria-label="Precio máximo" value={maxPrice} onChange={onChange} />
        </div>
      </div>
    </fieldset>
  )
}

export default PriceFilter
