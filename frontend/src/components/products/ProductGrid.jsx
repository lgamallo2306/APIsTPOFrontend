import ProductCard from './ProductCard'
import './ProductGrid.css'

function ProductGrid({ products }) {
  return (
    <section className="product-grid" aria-label="Productos">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ProductGrid
