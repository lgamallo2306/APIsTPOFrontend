import ProductGrid from '../products/ProductGrid'
import ProductGridSkeleton from '../products/ProductGridSkeleton'
import EmptyState from '../ui/EmptyState'
import Pagination from '../ui/Pagination'
import ResultsBar from './ResultsBar'

function CatalogResults({ loading, error, page, filters, hasFilters, categories, onRetry, onClear, onRemoveFilter, onPageChange }) {
  if (loading) return <ProductGridSkeleton />

  if (error) {
    return (
      <EmptyState title="No pudimos cargar el catálogo" text={error}>
        <button type="button" className="btn btn-primary" onClick={onRetry}>Reintentar</button>
      </EmptyState>
    )
  }

  if (page.totalElements === 0 && hasFilters) {
    return (
      <EmptyState title={filters.name !== '' ? `Sin resultados para “${filters.name}”` : 'Sin resultados'} text="Probá con otra palabra, sacá filtros de precio o buscá en todas las categorías.">
        <button type="button" className="btn btn-primary" onClick={onClear}>Limpiar filtros</button>
      </EmptyState>
    )
  }

  if (page.totalElements === 0) {
    return <EmptyState title="Todavía no hay productos" text="Cuando los vendedores publiquen sus piezas, van a aparecer acá." />
  }

  return (
    <>
      <ResultsBar total={page.totalElements} filters={filters} categories={categories} onRemoveFilter={onRemoveFilter} />
      <ProductGrid products={page.content} />
      <Pagination page={page} onChange={onPageChange} />
    </>
  )
}

export default CatalogResults
