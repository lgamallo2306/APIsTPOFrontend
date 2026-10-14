import { useState, useEffect } from 'react'
import { getSales } from '../../utils/api'
import SalesResults from './SalesResults'
import './MySales.css'

function MySales({ token }) {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    getSales(token)
      .then((data) => {
        setSales(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [token, retry])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetry(retry + 1)
  }

  return (
    <section className="my-sales">
      <SalesResults loading={loading} error={error} sales={sales} onRetry={handleRetry} />
    </section>
  )
}

export default MySales
