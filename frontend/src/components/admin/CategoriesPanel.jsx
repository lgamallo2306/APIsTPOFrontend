import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createCategory, updateCategory, deleteCategory } from '../../redux/categoriesSlice'
import { toast } from 'react-toastify'
import CategoriesBody from './CategoriesBody'
import CategoryModal from './CategoryModal'
import CategoryDeleteModal from './CategoryDeleteModal'

// Encabezado, lista, modales y avisos. Alta, edición y baja se despachan acá; el slice actualiza los datos
function CategoriesPanel({ token, loading, error, data, onPageChange, onRetry }) {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(null) // null | 'form' | 'delete'
  const [selected, setSelected] = useState(null)
  const [saveError, setSaveError] = useState('')
  const [deleteError, setDeleteError] = useState('')


  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const openNew = () => {
    setSelected(null)
    setSaveError('')
    setModal('form')
  }

  const openEdit = (category) => {
    setSelected(category)
    setSaveError('')
    setModal('form')
  }

  const openDelete = (category) => {
    setSelected(category)
    setDeleteError('')
    setModal('delete')
  }

  // dispatch devuelve una promesa con la acción final (fulfilled o rejected)
  const handleSave = (form) => {
    const wasEdit = selected !== null
    const action = wasEdit
      ? updateCategory({ token, id: selected.id, category: form })
      : createCategory({ token, category: form })
    dispatch(action).then((result) => {
      if (result.error) {
        setSaveError(result.error.message)
        return
      }
      toast.success(wasEdit ? 'Categoría actualizada' : 'Categoría creada')
      closeModal()
    })
  }

  // un 409 (la categoría tiene productos) llega como error y el modal lo muestra con "Entendido"
  const handleDelete = () => {
    dispatch(deleteCategory({ token, id: selected.id })).then((result) => {
      if (result.error) {
        setDeleteError(result.error.message)
        return
      }
      toast.success('Categoría eliminada')
      closeModal()
    })
  }

  return (
    <section className="categories-admin">
      <div className="categories-admin-header">
        <h1 className="h1">Categorías</h1>
        <button type="button" className="btn btn-primary" onClick={openNew}>Nueva categoría</button>
      </div>

      <CategoriesBody
        loading={loading}
        error={error}
        data={data}
        onPageChange={onPageChange}
        onRetry={onRetry}
        onNew={openNew}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      {modal === 'form' && <CategoryModal category={selected} error={saveError} onSave={handleSave} onClose={closeModal} />}
      {modal === 'delete' && <CategoryDeleteModal category={selected} error={deleteError} onConfirm={handleDelete} onClose={closeModal} />}
    </section>
  )
}

export default CategoriesPanel
