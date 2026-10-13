import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProducts, getCategories } from '../utils/api'
import CatalogHero from '../components/catalog/CatalogHero'
import CatalogSidebar from '../components/catalog/CatalogSidebar'
import CatalogFilters from '../components/catalog/CatalogFilters'
import CatalogResults from '../components/catalog/CatalogResults'
import './CatalogView.css'

const SIN_CONEXION = 'El servidor no respondió. Revisá tu conexión e intentá de nuevo en unos segundos.'

const toQuery = (values) =>
  new URLSearchParams(Object.entries(values).filter(([, value]) => value !== '')).toString()

function CatalogView() {
  const location = useLocation()
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [result, setResult] = useState({})
  const [retry, setRetry] = useState(0)
  const [filterError, setFilterError] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const params = new URLSearchParams(location.search)
  const filters = {
    name: params.get('name') ?? '',
    categoryId: params.get('categoryId') ?? '',
    minPrice: params.get('minPrice') ?? '',
    maxPrice: params.get('maxPrice') ?? '',
    sort: params.get('sort') ?? 'price,asc',
  }
  const query = toQuery({ ...filters, page: params.get('page') ?? '' })
  const hasFilters = filters.name !== '' || filters.categoryId !== '' || filters.minPrice !== '' || filters.maxPrice !== ''
  const loading = result.search !== `${query}#${retry}`

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.content))
      .catch(() => setCategories([]))
  }, [retry])

  useEffect(() => {
    const search = `${query}#${retry}`
    getProducts(query)
      .then((data) => setResult({ search, page: data }))
      .catch((error) => setResult({ search, error: error.status ? error.message : SIN_CONEXION }))
  }, [query, retry])

  const handleApply = (form) => {
    if (form.minPrice !== '' && form.maxPrice !== '' && Number(form.minPrice) > Number(form.maxPrice)) {
      setFilterError('El precio mínimo no puede ser mayor al máximo.')
      return
    }
    setFilterError('')
    setShowFilters(false)
    navigate(`/?${toQuery(form)}`)
  }

  const handleClear = () => {
    setFilterError('')
    navigate('/')
  }

  return (
    <main className="catalog">
      <CatalogHero />
      <div className="catalog-body">
        <CatalogSidebar open={showFilters} onToggle={() => setShowFilters(!showFilters)}>
          <CatalogFilters key={location.search} categories={categories} filters={filters} error={filterError} onApply={handleApply} onClear={handleClear} />
        </CatalogSidebar>
        <section className="catalog-results">
          <CatalogResults
            loading={loading}
            error={result.error}
            page={result.page}
            filters={filters}
            hasFilters={hasFilters}
            categories={categories}
            onRetry={() => setRetry(retry + 1)}
            onClear={handleClear}
            onRemoveFilter={(key) => navigate(`/?${toQuery({ ...filters, [key]: '' })}`)}
            onPageChange={(page) => navigate(`/?${toQuery({ ...filters, page })}`)}
          />
        </section>
      </div>
    </main>
  )
}

export default CatalogView
