import ProductGrid from '../products/ProductGrid'
import ProductGridSkeleton from '../products/ProductGridSkeleton'
import EmptyState from '../ui/EmptyState'
import Pagination from '../ui/Pagination'
import ResultsBar from './ResultsBar'

function CatalogResults({ loading, error, products, filters, hasFilters, categories, onRetry, onClear, onRemoveFilter, onPageChange }) {
  if (loading) return <ProductGridSkeleton />

  if (error) {
    return <EmptyState title="No pudimos cargar el catálogo" text={error} actionLabel="Reintentar" onAction={onRetry} />
  }

  if (products.totalElements === 0 && hasFilters) {
    const title = filters.name !== '' ? `Sin resultados para “${filters.name}”` : 'Sin resultados'
    return <EmptyState title={title} text="Probá con otra palabra, sacá filtros de precio o buscá en todas las categorías." actionLabel="Limpiar filtros" onAction={onClear} />
  }

  if (products.totalElements === 0) {
    return <EmptyState title="Todavía no hay productos" text="Cuando los vendedores publiquen sus piezas, van a aparecer acá." />
  }

  return (
    <>
      <ResultsBar total={products.totalElements} filters={filters} categories={categories} onRemoveFilter={onRemoveFilter} />
      <ProductGrid products={products.content} />
      <Pagination page={products} onChange={onPageChange} />
    </>
  )
}

export default CatalogResults
