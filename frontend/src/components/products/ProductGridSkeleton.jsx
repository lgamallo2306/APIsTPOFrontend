import './ProductGrid.css'
import './ProductGridSkeleton.css'

const CARDS = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

function ProductGridSkeleton() {
  return (
    <section className="product-grid" aria-label="Cargando productos">
      {CARDS.map((card) => (
        <div key={card.id} className="pcard">
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
