import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateStock, updateDiscount, deleteProduct } from '../../redux/sellerSlice'
import { toast } from 'react-toastify'
import MyProductsResults from './MyProductsResults'
import StockModal from './StockModal'
import DiscountModal from './DiscountModal'
import ProductDeleteModal from './ProductDeleteModal'

// si el back falla sin mensaje (por ejemplo, un 500), se muestra este
const ERROR_GENERICO = 'No pudimos completar la operación. Intentá de nuevo en unos segundos.'

// Botones de arriba, tabla, modales y avisos. Las llamadas de stock, descuento y baja salen de acá
function MyProductsPanel({ token, loading, error, data, onRetry, onPageChange }) {
  const [modal, setModal] = useState(null) // null | 'stock' | 'discount' | 'delete'
  const [selected, setSelected] = useState(null)
  const [actionError, setActionError] = useState('')
  const dispatch = useDispatch()
  

  const openModal = (name, product) => {
    setSelected(product)
    setActionError('')
    setModal(name)
  }

  const closeModal = () => {
    setModal(null)
    setSelected(null)
  }

  const handleError = (message) => {
    setActionError(message ? message : ERROR_GENERICO)
  }

  
  const handleDiscount = (discount) => {
  dispatch(updateDiscount({ token, id: selected.id, discount })).then((result) => {
    if (result.error) {
      handleError(result.error.message)
      return
    }
    toast.success('Descuento aplicado')
    closeModal()
  })
}

 const handleStock = (newStock) => {
  dispatch(updateStock({ token, id: selected.id, quantity: newStock - selected.stock })).then((result) => {
    if (result.error) {
      handleError(result.error.message)
      return
    }
    toast.success('Stock actualizado')
    closeModal()
  })
}
 const handleDelete = () => {
  dispatch(deleteProduct({ token, id: selected.id })).then((result) => {
    if (result.error) {
      handleError(result.error.message)
      return
    }
    toast.success('Producto eliminado')
    closeModal()
  })
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
