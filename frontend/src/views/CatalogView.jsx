import CatalogHero from '../components/catalog/CatalogHero'
import Catalog from '../components/catalog/Catalog'
import './CatalogView.css'

function CatalogView({ categories }) {
  return (
    <main className="catalog-view">
      <CatalogHero />
      <Catalog categories={categories} />
    </main>
  )
}

export default CatalogView
