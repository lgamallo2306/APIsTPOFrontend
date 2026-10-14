import EmptyState from '../ui/EmptyState'
import Pagination from '../ui/Pagination'
import MyProductsSkeleton from './MyProductsSkeleton'
import SellerProductsTable from './SellerProductsTable'

function MyProductsResults({ loading, error, data, onRetry, onPageChange }) {
  if (loading) return <MyProductsSkeleton />

  if (error) {
    return <EmptyState title="No pudimos cargar tus productos" text={error} actionLabel="Reintentar" onAction={onRetry} />
  }

  if (data.content.length === 0) {
    return <EmptyState title="Todavía no publicaste productos" text="Cuando cargues tu primer producto, va a aparecer acá." />
  }

  return (
    <>
      <SellerProductsTable products={data.content} />
      <Pagination page={data} onChange={onPageChange} />
      <p className="small muted">{data.totalElements} {data.totalElements === 1 ? 'producto publicado' : 'productos publicados'}</p>
    </>
  )
}

export default MyProductsResults