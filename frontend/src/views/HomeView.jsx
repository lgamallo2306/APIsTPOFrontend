import ProductRow from '../components/home/ProductRow'
import './HomeView.css'
import CategoryStrip from '../components/home/CategoryStrip'
import HomeHero from '../components/home/HomeHero'
import MakersBanner from '../components/home/MakersBanner'

function HomeView({ categories, user }) {
  return (
    <main className="home-view">
        <HomeHero />
        <CategoryStrip categories={ categories} />
        <ProductRow
            title="Ofertas"
            subtitle="Los mayores descuentos del momento"
            query="sort=discount,desc"
            moreLink="/catalogo?sort=discount,desc"
        />
        <ProductRow
            title="Novedades"
            subtitle="Recién publicados por los makers"
            query="sort=id,desc"
            moreLink="/catalogo?sort=id,desc"
        />
        <ProductRow
            title="Menos de $ 5.000"
            subtitle="Piezas útiles a buen precio"
            query="maxPrice=5000&sort=price,asc"
            moreLink="/catalogo?maxPrice=5000"
        />
        <MakersBanner user={user} />
    </main>
  )
}

export default HomeView