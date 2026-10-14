import EmptyState from '../ui/EmptyState'
import Pagination from '../ui/Pagination'
import CategoriesTable from './CategoriesTable'

// Los estados de la lista: cargando, error con Reintentar, vacío y la tabla con su paginado
function CategoriesBody({ loading, error, data, onPageChange, onRetry, onNew, onEdit, onDelete }) {
  if (loading) return <div className="skel categories-skeleton" />

  if (error) return <EmptyState title="No pudimos cargar las categorías" text={error} actionLabel="Reintentar" onAction={onRetry} />

  if (data.content.length === 0) return <EmptyState title="No hay categorías" text="Creá la primera para empezar a cargar productos." actionLabel="Nueva categoría" onAction={onNew} />

  return (
    <>
      <CategoriesTable categories={data.content} onEdit={onEdit} onDelete={onDelete} />
      <Pagination page={data} onChange={onPageChange} />
    </>
  )
}

export default CategoriesBody
