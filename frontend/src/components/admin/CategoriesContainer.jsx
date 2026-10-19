import { useState, useEffect } from 'react'
import { getCategoriesPage } from '../../utils/api'
import CategoriesPanel from './CategoriesPanel'
import './CategoriesContainer.css'

const ERROR_CARGA = 'No pudimos traer las categorías. Revisá tu conexión e intentá de nuevo.'

// data es la página que devuelve el back: content, number, totalPages, first, last
function CategoriesContainer({ token, onLogout, onCategorySaved, onCategoryDeleted }) {
  const [page, setPage] = useState(0)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)

  // cambia la página o se reintenta: es una consulta nueva, no un refresco
  useEffect(() => {
    getCategoriesPage(page)
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.status ? err.message : ERROR_CARGA)
        setLoading(false)
      })
  }, [page, retry])

  const handlePageChange = (number) => {
    setLoading(true)
    setError('')
    setPage(number)
  }

  const handleRetry = () => {
    setLoading(true)
    setError('')
    setRetry(retry + 1)
  }

  // el back devuelve la categoría guardada: se actualiza la página local, sin volver a pedirla
  const handleSaved = (saved, wasEdit) => {
    setData({
      ...data,
      content: wasEdit
        ? data.content.map((item) => (item.id === saved.id ? saved : item))
        : [...data.content, saved],
    })
    onCategorySaved(saved, wasEdit)
  }

  const handleDeleted = (id) => {
    const remaining = data.content.filter((item) => item.id !== id)
    onCategoryDeleted(id)
    // si se vació una página que no es la primera, se vuelve a la anterior
    if (remaining.length === 0 && page > 0) handlePageChange(page - 1)
    else setData({ ...data, content: remaining })
  }

  return (
    <CategoriesPanel
      token={token}
      onLogout={onLogout}
      loading={loading}
      error={error}
      data={data}
      onPageChange={handlePageChange}
      onRetry={handleRetry}
      onSaved={handleSaved}
      onDeleted={handleDeleted}
    />
  )
}

export default CategoriesContainer
