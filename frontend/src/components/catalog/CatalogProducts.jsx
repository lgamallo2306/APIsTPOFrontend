import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../Redux/productSlice'
import CatalogResults from './CatalogResults'
import './CatalogProducts.css'


function CatalogProducts({ filters, pageNumber, categories, onClear, onRemoveFilter, onPageChange }) {

  const dispatch = useDispatch()
  const catalog = useSelector((state) => state.products.catalog)


  const params = new URLSearchParams({ sort: filters.sort, page: pageNumber })
  if (filters.name !== '') params.set('name', filters.name)
  if (filters.categoryId !== '') params.set('categoryId', filters.categoryId)
  if (filters.minPrice !== '') params.set('minPrice', filters.minPrice)
  if (filters.maxPrice !== '') params.set('maxPrice', filters.maxPrice)
  const query = params.toString()

 
  useEffect(() => {
    if(catalog.query !== query) dispatch(fetchProducts(query))
  }, [dispatch, query, catalog.query])

    const handleRetry = () => {
    dispatch(fetchProducts(query))
  }

  const loading = catalog.query !== query || catalog.loading
  
  const hasFilters = filters.name !== '' || filters.categoryId !== '' || filters.minPrice !== '' || filters.maxPrice !== ''

  return (
    <section className="catalog-products">
      <CatalogResults
        loading={loading}
        error={catalog.error}
        products={catalog.page}
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