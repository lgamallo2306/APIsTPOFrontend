import SellerLayout from '../components/seller/SellerLayout'
import ProductEditor from '../components/seller/ProductEditor'

// La misma vista sirve para alta y edición: App le pasa el título según la ruta
function ProductFormView({ title }) {
  return (
    <SellerLayout title={title}>
      <ProductEditor />
    </SellerLayout>
  )
}

export default ProductFormView
