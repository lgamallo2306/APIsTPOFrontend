import ProductDetail from '../components/products/ProductDetail'

function ProductDetailView({ token, user }) {
  return (
    <main>
      <ProductDetail token={token} user={user} />
    </main>
  )
}

export default ProductDetailView
