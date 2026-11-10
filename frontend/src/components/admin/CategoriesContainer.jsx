import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoriesPage } from '../../redux/categoriesSlice'
import CategoriesPanel from './CategoriesPanel'
import './CategoriesContainer.css'

// page = página que se quiere ver; categoriesPage = la que está en el store
function CategoriesContainer({ token }) {
  const dispatch = useDispatch()
  const categoriesPage = useSelector((state) => state.categories.page)
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (categoriesPage.number !== page) {
      dispatch(fetchCategoriesPage(page))
    } else if (categoriesPage.data && categoriesPage.data.content.length === 0 && page > 0) {
      // se borró la última categoría de una página que no es la primera: se vuelve a la anterior
      setPage(page - 1)
    }
  }, [dispatch, page, categoriesPage.number, categoriesPage.data])

  const handleRetry = () => {
    dispatch(fetchCategoriesPage(page))
  }

  const loading = categoriesPage.number !== page || categoriesPage.loading

  return (
    <CategoriesPanel
      token={token}
      loading={loading}
      error={categoriesPage.error}
      data={categoriesPage.data}
      onPageChange={setPage}
      onRetry={handleRetry}
    />
  )
}

export default CategoriesContainer
