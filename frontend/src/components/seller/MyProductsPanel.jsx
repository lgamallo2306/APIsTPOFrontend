import { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateStock, updateDiscount, deleteProduct } from '../../utils/api'
import { toast } from 'react-toastify'
import MyProductsResults from './MyProductsResults'
import StockModal from './StockModal'
import DiscountModal from './DiscountModal'
import ProductDeleteModal from './ProductDeleteModal'

// si el back falla sin mensaje (por ejemplo, un 500), se muestra este
const ERROR_GENERICO = 'No pudimos completar la operación. Intentá de nuevo en unos segundos.'

// Botones de arriba, tabla, modales y avisos. Las llamadas de stock, descuento y baja salen de acá
function MyProductsPanel({ token, onLogout, loading, error, data, onRetry, onPageChange, onUpdated, onDeleted }) {
  const [modal, setModal] = useState(null) // null | 'stock' | 'discount' | 'delete'
  const [selected, setSelected] = useState(null)
  const [actionError, setActionError] = useState('')
  

  const openModal = (name, product) => {
    setSelected(product)
    setActionError('')
    setModal(name)
  }

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const handleError = (err) => {
    if (err.status === 401 || err.status === 403) onLogout()
    setActionError(err.message ? err.message : ERROR_GENERICO)
  }

  // el back suma la cantidad al stock actual: se manda la diferencia entre el valor nuevo y el actual
  const handleStock = (newStock) => {
    updateStock(token, selected.id, newStock - selected.stock)
      .then((updated) => {
        onUpdated(updated)
        toast.success('Stock actualizado')
        closeModal()
      })
      .catch(handleError)
  }

  const handleDiscount = (discount) => {
    updateDiscount(token, selected.id, discount)
      .then((updated) => {
        onUpdated(updated)
        toast.success('Descuento aplicado')
        closeModal()
      })
      .catch(handleError)
  }

  const handleDelete = () => {
    deleteProduct(token, selected.id)
      .then(() => {
        onDeleted(selected.id)
        toast.success('Producto eliminado')
        closeModal()
      })
      .catch(handleError)
  }

  return (
    <section className="my-products">
      <div className="my-products-bar">
        <Link to="/vendedor/calculadora" className="btn btn-secondary">Calcular precio</Link>
        <Link to="/vendedor/productos/nuevo" className="btn btn-primary">Nuevo producto</Link>
      </div>
      <MyProductsResults
        loading={loading}
        error={error}
        data={data}
        onRetry={onRetry}
        onPageChange={onPageChange}
        onStock={(product) => openModal('stock', product)}
        onDiscount={(product) => openModal('discount', product)}
        onDelete={(product) => openModal('delete', product)}
      />
      {modal === 'stock' && <StockModal product={selected} error={actionError} onSave={handleStock} onClose={closeModal} />}
      {modal === 'discount' && <DiscountModal product={selected} error={actionError} onSave={handleDiscount} onClose={closeModal} />}
      {modal === 'delete' && <ProductDeleteModal product={selected} error={actionError} onConfirm={handleDelete} onClose={closeModal} />}
    </section>
  )
}

export default MyProductsPanel
