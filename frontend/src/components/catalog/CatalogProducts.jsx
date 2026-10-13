import { useState, useEffect } from 'react'
import { getProducts } from '../../utils/api'
import CatalogResults from './CatalogResults'
import './CatalogProducts.css'

const ERROR_CARGA = 'No pudimos traer los productos. Revisá tu conexión e intentá de nuevo en unos segundos.'

function CatalogProducts({ filters, pageNumber, categories, onClear, onRemoveFilter, onPageChange }) {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  const query = `${new URLSearchParams({ ...filters, page: pageNumber })}`
  const [lastQuery, setLastQuery] = useState(query)
  if (query !== lastQuery) {
    setLastQuery(query)
    setLoading(true)
    setError('')
  }

  useEffect(() => {
    let active = true
    getProducts(query)
      .then((data) => {
        if (!active) return
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        if (!active) return
        setError(err.status && err.message ? err.message : ERROR_CARGA)
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [query, retry])

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetry(retry + 1)
  }

  const hasFilters = filters.name !== '' || filters.categoryId !== '' || filters.minPrice !== '' || filters.maxPrice !== ''

  return (
    <section className="catalog-products">
      <CatalogResults loading={loading} error={error} products={products} filters={filters} hasFilters={hasFilters} categories={categories}
        onRetry={handleRetry} onClear={onClear} onRemoveFilter={onRemoveFilter} onPageChange={onPageChange} />
    </section>
  )
}

export default CatalogProducts
