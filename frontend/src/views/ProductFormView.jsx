import { useLocation } from 'react-router-dom'
import SellerLayout from '../components/seller/SellerLayout'
import ProductEditor from '../components/seller/ProductEditor'

// La misma vista sirve para alta y edición: App le pasa el título según la ruta.
// Recién creado el producto, la URL ya es la de edición, pero el alta sigue (paso 2): el título no cambia
function ProductFormView({ title }) {
  const location = useLocation()
  const created = location.state && location.state.created

  return (
    <SellerLayout title={created ? 'Nuevo producto' : title}>
      <ProductEditor />
    </SellerLayout>
  )
}

export default ProductFormView
