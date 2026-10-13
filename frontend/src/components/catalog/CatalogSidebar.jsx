import CatalogFilters from './CatalogFilters'
import './CatalogSidebar.css'

function CatalogSidebar({ open, onToggle, categories, filters, search, error, onApply, onClear }) {
  return (
    <>
      <button type="button" className="btn btn-secondary btn-sm catalog-sidebar-toggle" onClick={onToggle}>
        {open ? 'Ocultar filtros' : 'Filtros'}
      </button>
      <aside className={open ? 'catalog-sidebar catalog-sidebar-open' : 'catalog-sidebar'} aria-label="Filtros">
        <CatalogFilters categories={categories} filters={filters} search={search} error={error} onApply={onApply} onClear={onClear} />
      </aside>
    </>
  )
}

export default CatalogSidebar
