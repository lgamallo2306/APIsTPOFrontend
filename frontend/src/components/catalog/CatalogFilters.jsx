import { useState } from 'react'
import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import SortDropdown from './SortDropdown'
import './CatalogFilters.css'

function CatalogFilters({ categories, filters, error, onApply, onClear }) {
  const [form, setForm] = useState(filters)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onApply(form)
  }

  return (
    <form className="catalog-filters" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="filter-name">Nombre</label>
        <input id="filter-name" name="name" className="input" value={form.name} onChange={handleChange} />
      </div>
      <CategoryFilter categories={categories} value={form.categoryId} onChange={handleChange} />
      <PriceFilter minPrice={form.minPrice} maxPrice={form.maxPrice} onChange={handleChange} />
      <SortDropdown value={form.sort} onChange={handleChange} />
      {error && <p className="alert-err">{error}</p>}
      <div className="catalog-filters-actions">
        <button type="submit" className="btn btn-primary">Aplicar</button>
        <button type="button" className="btn btn-ghost" onClick={onClear}>Limpiar</button>
      </div>
    </form>
  )
}

export default CatalogFilters
