import { useState, useEffect } from 'react'
import { getSellerProducts } from '../../utils/api'
import MyProductsPanel from './MyProductsPanel'
import './MyProducts.css'

const ERROR_CARGA = 'No pudimos traer tus productos. Revisá tu conexión e intentá de nuevo.'


function MyProducts({ token, onLogout }) {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError('')
    getSellerProducts(token, page)
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.status && err.message ? err.message : ERROR_CARGA)
        setLoading(false)
      })
  }, [token, page, retry])

  const handleRetry = () => {
    setRetry(retry + 1)
  }

  // stock y descuento devuelven el producto actualizado: se reemplaza en la página, sin otro GET
  const handleUpdated = (updated) => {
    setData({ ...data, content: data.content.map((item) => (item.id === updated.id ? updated : item)) })
  }

  const handleDeleted = (id) => {
    const remaining = data.content.filter((item) => item.id !== id)
    // si se vació una página que no es la primera, se vuelve a la anterior
    if (remaining.length === 0 && page > 0) {
      setPage(page - 1)
      return
    }
    setData({ ...data, content: remaining, totalElements: data.totalElements - 1 })
  }

  return (
    <MyProductsPanel
      token={token}
      onLogout={onLogout}
      loading={loading}
      error={error}
      data={data}
      onRetry={handleRetry}
      onPageChange={(number) => setPage(number)}
      onUpdated={handleUpdated}
      onDeleted={handleDeleted}
    />
  )
}

export default MyProducts
