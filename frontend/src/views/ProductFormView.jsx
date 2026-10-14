import SellerLayout from '../components/seller/SellerLayout'
import ProductEditor from '../components/seller/ProductEditor'

// La misma vista sirve para alta y edición: App le pasa el título según la ruta
function ProductFormView({ title, user, token, categories, onLogout }) {
  return (
    <SellerLayout title={title}>
      <ProductEditor user={user} token={token} categories={categories} onLogout={onLogout} />
    </SellerLayout>
  )
}

export default ProductFormView
