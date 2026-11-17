import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSales } from '../../redux/salesSlice'
import SalesResults from './SalesResults'
import './MySales.css'

function MySales() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const sales = useSelector((state) => state.sales.sales)

  useEffect(() => {
    if (sales.token !== token) dispatch(getSales(token))
  }, [dispatch, token, sales.token])

  const handleRetry = () => {
    dispatch(getSales(token))
  }

  const loading = sales.token !== token || sales.loading

  return (
    <section className="my-sales">
      <SalesResults loading={loading} error={sales.error} sales={sales.items} onRetry={handleRetry} />
    </section>
  )
}

export default MySales
