import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CatalogSidebar from './CatalogSidebar'
import CatalogFilters from './CatalogFilters'
import CatalogProducts from './CatalogProducts'
import './Catalog.css'

function Catalog({ categories }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [filterError, setFilterError] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const params = new URLSearchParams(location.search)
  const filters = {
    name: params.get('name') || '',
    categoryId: params.get('categoryId') || '',
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    sort: params.get('sort') || 'price,asc',
  }
  const pageNumber = params.get('page') || '0'

  const search = (values) => navigate(`/?${new URLSearchParams(values)}`)

  const handleApply = (form) => {
    if (form.minPrice !== '' && form.maxPrice !== '' && Number(form.minPrice) > Number(form.maxPrice)) {
      setFilterError('El precio mínimo no puede ser mayor al máximo.')
      return
    }
    setFilterError('')
    setShowFilters(false)
    search(form)
  }

  const handleClear = () => {
    setFilterError('')
    setShowFilters(false)
    navigate('/')
  }

  return (
    <div className="catalog">
      <CatalogSidebar open={showFilters} onToggle={() => setShowFilters(!showFilters)}>
        <CatalogFilters
          categories={categories}
          filters={filters}
          error={filterError}
          onApply={handleApply}
          onClear={handleClear}
        />
      </CatalogSidebar>
      <CatalogProducts
        filters={filters}
        pageNumber={pageNumber}
        categories={categories}
        onClear={handleClear}
        onRemoveFilter={(field) => search({ ...filters, [field]: '' })}
        onPageChange={(number) => search({ ...filters, page: number })}
      />
    </div>
  )
}

export default Catalog