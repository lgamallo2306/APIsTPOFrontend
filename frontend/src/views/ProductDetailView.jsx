import ProductDetail from '../components/products/ProductDetail'

function ProductDetailView({ token, user, onCartChange, onLogout }) {
  return (
    <main>
      <ProductDetail token={token} user={user} onCartChange={onCartChange} onLogout={onLogout} />
    </main>
  )
}

export default ProductDetailView
