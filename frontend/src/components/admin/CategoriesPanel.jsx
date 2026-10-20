import { useState } from 'react'
import { createCategory, updateCategory, deleteCategory } from '../../utils/api'
import { toast } from 'react-toastify'
import CategoriesBody from './CategoriesBody'
import CategoryModal from './CategoryModal'
import CategoryDeleteModal from './CategoryDeleteModal'

// Encabezado, lista, modales y avisos. Las llamadas de alta, edición y baja salen de acá; el contenedor actualiza los datos
function CategoriesPanel({ token, onLogout, loading, error, data, onPageChange, onRetry, onSaved, onDeleted }) {
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

  const handleSave = (form) => {
    const wasEdit = selected !== null
    const request = wasEdit ? updateCategory(token, selected.id, form) : createCategory(token, form)
    request
      .then((saved) => {
        onSaved(saved, wasEdit)
        toast.success(wasEdit ? 'Categoría actualizada' : 'Categoría creada')
        closeModal()
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) onLogout()
        setSaveError(err.message)
      })
  }

  // un 409 (la categoría tiene productos) llega como error y el modal lo muestra con "Entendido"
  const handleDelete = () => {
    deleteCategory(token, selected.id)
      .then(() => {
        onDeleted(selected.id)
        toast.success('Categoría eliminada')
        closeModal()
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) onLogout()
        setDeleteError(err.message)
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
