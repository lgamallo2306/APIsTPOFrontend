import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../redux/productSlice'
import EmptyState from '../ui/EmptyState'
import ProductEditorPanel from './ProductEditorPanel'
import './ProductEditor.css'

// Lee la URL y consigue el producto a editar. En el alta no hay producto
function ProductEditor() {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const sellerPage = useSelector((state) => state.seller.page)
  const detail = useSelector((state) => state.products.detail)
  const id = location.pathname.split('/')[3] // "/vendedor/productos/5" → "5" · "/vendedor/productos/nuevo" → "nuevo"
  const isNew = id === 'nuevo'
  const suggestedPrice = location.state && location.state.price ? location.state.price : null
  const productFromList = sellerPage.data ? sellerPage.data.content.find((item) => String(item.id) === id) : undefined
  const needsFetch = !isNew && productFromList === undefined

  useEffect(() => {
    if (needsFetch && detail.id !== id) dispatch(fetchProduct(id))
  }, [dispatch, id, needsFetch, detail.id])

  if (needsFetch && (detail.id !== id || detail.loading)) return <div className="skel product-editor-skeleton" />

  if (needsFetch && detail.error) {
    return <EmptyState title="No pudimos cargar el producto" text={detail.error} actionLabel="Reintentar" onAction={() => dispatch(fetchProduct(id))} />
  }

  let product = null
  if (!isNew) product = productFromList !== undefined ? productFromList : detail.product

  if (product && product.sellerId !== user.id && !user.roles.includes('ADMIN')) {
    return <EmptyState title="Este producto no es tuyo" text="Solo podés editar los productos que publicaste vos." />
  }

  return <ProductEditorPanel product={product} suggestedPrice={isNew ? suggestedPrice : null} />
}

export default ProductEditor
