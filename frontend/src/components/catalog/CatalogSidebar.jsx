import './CatalogSidebar.css'

function CatalogSidebar({ open, onToggle, children }) {
  return (
    <>
      <button type="button" className="btn btn-secondary btn-sm catalog-sidebar-toggle" onClick={onToggle}>
        {open ? 'Ocultar filtros' : 'Filtros'}
      </button>
      <aside className={open ? 'catalog-sidebar catalog-sidebar-open' : 'catalog-sidebar'} aria-label="Filtros">
        {children}
      </aside>
    </>
  )
}

export default CatalogSidebar
