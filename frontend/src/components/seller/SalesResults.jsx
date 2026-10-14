import EmptyState from '../ui/EmptyState'
import SalesSkeleton from './SalesSkeleton'
import SalesMetrics from './SalesMetrics'
import SalesTable from './SalesTable'

function SalesResults({ loading, error, sales, onRetry }) {
  if (loading) return <SalesSkeleton />

  if (error) {
    return <EmptyState title="No pudimos cargar tus ventas" text={error} actionLabel="Reintentar" onAction={onRetry} />
  }

  if (sales.length === 0) {
    return <EmptyState title="Todavía no tenés ventas" text="Cuando alguien compre uno de tus productos, la orden va a aparecer acá." />
  }

  return (
    <>
      <SalesMetrics sales={sales} />
      <SalesTable sales={sales} />
      <p className="small muted">De cada orden solo se muestran tus productos.</p>
    </>
  )
}

export default SalesResults
