import { formatPrice } from '../../utils/format'
import './ResultsBar.css'

function ResultsBar({ total, filters, categories, onRemoveFilter }) {
  const category = categories.find((c) => String(c.id) === filters.categoryId)
  const chips = [
    filters.name !== '' && { id: 'name', label: `nombre: ${filters.name}` },
    category && { id: 'categoryId', label: category.description },
    filters.minPrice !== '' && { id: 'minPrice', label: `desde ${formatPrice(Number(filters.minPrice))}` },
    filters.maxPrice !== '' && { id: 'maxPrice', label: `hasta ${formatPrice(Number(filters.maxPrice))}` },
  ].filter((chip) => chip)

  return (
    <div className="results-bar">
      <span className="results-bar-total">{total} {total === 1 ? 'producto' : 'productos'}</span>
      {chips.map((chip) => (
        <span key={chip.id} className="chip results-bar-chip">
          {chip.label}
          <button type="button" aria-label="Quitar filtro" onClick={() => onRemoveFilter(chip.id)}>×</button>
        </span>
      ))}
    </div>
  )
}

export default ResultsBar
