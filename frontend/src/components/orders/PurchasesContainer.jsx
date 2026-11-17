import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchOrders } from '../../redux/ordersSlice'
import EmptyState from '../ui/EmptyState'
import PurchaseRow from './PurchaseRow'
import './PurchasesContainer.css'

// Historial de compras: lee la lista del store y la pide solo si todavía no se cargó
function PurchasesContainer() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()
  const list = useSelector((state) => state.orders.list)

  useEffect(() => {
    if (!list.loaded) dispatch(fetchOrders(token))
  }, [dispatch, token, list.loaded])

  if (list.loading || (!list.loaded && list.error === null)) return <section className="purchases"><div className="skel purchases-skeleton" /></section>

  if (list.error) return <EmptyState title="No pudimos cargar tus compras" text={list.error} actionLabel="Reintentar" onAction={() => dispatch(fetchOrders(token))} />

  if (list.items.length === 0) return <EmptyState title="Todavía no compraste nada" text="Cuando completes una compra, va a aparecer acá." actionLabel="Ir al catálogo" onAction={() => navigate('/catalogo')} />

  return (
    <section className="purchases">
      <h1 className="h1">Mis compras</h1>
      <ul className="purchases-list">
        {list.items.map((order) => (
          <PurchaseRow key={order.id} order={order} />
        ))}
      </ul>
    </section>
  )
}

export default PurchasesContainer
