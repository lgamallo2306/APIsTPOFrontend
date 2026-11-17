import CatalogHero from '../components/catalog/CatalogHero'
import Catalog from '../components/catalog/Catalog'
import './CatalogView.css'

function CatalogView() {
  return (
    <main className="catalog-view">
      <CatalogHero />
      <Catalog />
    </main>
  )
}

export default CatalogView
