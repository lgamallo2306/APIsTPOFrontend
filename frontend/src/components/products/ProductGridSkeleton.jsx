import './ProductGrid.css'
import './ProductGridSkeleton.css'

const CARDS = [1, 2, 3, 4, 5, 6]

function ProductGridSkeleton() {
  return (
    <section className="product-grid" aria-label="Cargando productos">
      {CARDS.map((card, index) => (
        <div key={index} className="pcard">
          <div className="skel product-grid-skeleton-img" />
          <div className="product-grid-skeleton-body">
            <div className="skel product-grid-skeleton-line" />
            <div className="skel product-grid-skeleton-line product-grid-skeleton-wide" />
            <div className="skel product-grid-skeleton-price" />
          </div>
        </div>
      ))}
    </section>
  )
}

export default ProductGridSkeleton
