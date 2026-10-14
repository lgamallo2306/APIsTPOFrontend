import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getSellerProducts } from '../../utils/api'
import MyProductsResults from './MyProductsResults'
import './MyProducts.css'

const ERROR_CARGA = 'No pudimos traer tus productos. Revisá tu conexión e intentá de nuevo.'

function MyProducts({ token }) {
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

  return (
    <section className="my-products">
      <div className="my-products-bar">
        <Link to="/vendedor/productos/nuevo" className="btn btn-primary">Nuevo producto</Link>
      </div>
      <MyProductsResults
        loading={loading}
        error={error}
        data={data}
        onRetry={handleRetry}
        onPageChange={(number) => setPage(number)}
      />
    </section>
  )
}

export default MyProducts
