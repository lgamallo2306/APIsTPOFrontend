import ProductGrid from '../products/ProductGrid'
import ProductGridSkeleton from '../products/ProductGridSkeleton'
import EmptyState from '../ui/EmptyState'
import Pagination from '../ui/Pagination'

function SellerProducts({ loading, error, products, onRetry, onPageChange }) {
  if (loading) return <ProductGridSkeleton />

  if (error) {
    return <EmptyState title="No pudimos cargar los productos" text={error} actionLabel="Reintentar" onAction={onRetry} />
  }

  if (products.totalElements === 0) {
    return <EmptyState title="Todavía no publicó productos" text="Cuando este vendedor publique sus piezas, van a aparecer acá." />
  }

  return (
    <section className="seller-products">
      <h2 className="h2">Productos</h2>
      <span className="small muted">{products.totalElements} {products.totalElements === 1 ? 'producto publicado' : 'productos publicados'}</span>
      <ProductGrid products={products.content} />
      <Pagination page={products} onChange={onPageChange} />
    </section>
  )
}

export default SellerProducts
