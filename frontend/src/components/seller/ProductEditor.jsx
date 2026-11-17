import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditorProduct } from '../../redux/sellerSlice'
import EmptyState from '../ui/EmptyState'
import ProductEditorPanel from './ProductEditorPanel'
import './ProductEditor.css'

function ProductEditor({ user, token, categories }) {
  const location = useLocation()
  const id = location.pathname.split('/')[3] // "/vendedor/productos/5" → "5" · "/vendedor/productos/nuevo" → "nuevo"
  const isNew = id === 'nuevo'
  const suggestedPrice = location.state && location.state.price ? location.state.price: null
  const dispatch = useDispatch()
  const editor = useSelector((state) => state.seller.editor)

  useEffect(()=>{
    if(!isNew && editor.id !== id) dispatch(fetchEditorProduct(id))
  },[dispatch, isNew, id, editor.id])

  const loading = !isNew && (editor.id !== id || editor.loading)
  const error = isNew ? null : editor.error
  const product = isNew ? null : editor.product

  if (loading) return <div className="skel product-editor-skeleton" />

  if (error) {
    return <EmptyState title="No pudimos cargar el producto" text={error} actionLabel="Reintentar" onAction={() => dispatch(fetchEditorProduct(id))} />
  }

  
  if (product && product.sellerId !== user.id && !user.roles.includes('ADMIN')) {
    return <EmptyState title="Este producto no es tuyo" text="Solo podés editar los productos que publicaste vos." />
  }

  return (
    <ProductEditorPanel
      token={token}
      categories={categories}
      product={product}
      suggestedPrice={isNew ? suggestedPrice : null}
    />
  )
}

export default ProductEditor
