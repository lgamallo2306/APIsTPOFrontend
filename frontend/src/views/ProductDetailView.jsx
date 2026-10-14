import ProductDetail from '../components/products/ProductDetail'

function ProductDetailView({ token, onCartChange, onLogout }) {
  return (
    <main>
      <ProductDetail token={token} onCartChange={onCartChange} onLogout={onLogout} />
    </main>
  )
}

export default ProductDetailView
