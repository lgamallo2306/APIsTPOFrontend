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

  const params = new URLSearchParams({ sort: filters.sort, page: pageNumber })
  if (filters.name !== '') params.set('name', filters.name)
  if (filters.categoryId !== '') params.set('categoryId', filters.categoryId)
  if (filters.minPrice !== '') params.set('minPrice', filters.minPrice)
  if (filters.maxPrice !== '') params.set('maxPrice', filters.maxPrice)
  const query = params.toString()

  useEffect(() => {
    setLoading(true)
    setError('')
    getProducts(query)
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.status && err.message ? err.message : ERROR_CARGA)
        setLoading(false)
      })
  }, [query, retry])

  const handleRetry = () => {
    setRetry(retry + 1)
  }

  const hasFilters = filters.name !== '' || filters.categoryId !== '' || filters.minPrice !== '' || filters.maxPrice !== ''

  return (
    <section className="catalog-products">
      <CatalogResults
        loading={loading}
        error={error}
        products={products}
        filters={filters}
        hasFilters={hasFilters}
        categories={categories}
        onRetry={handleRetry}
        onClear={onClear}
        onRemoveFilter={onRemoveFilter}
        onPageChange={onPageChange}
      />
    </section>
  )
}

export default CatalogProducts