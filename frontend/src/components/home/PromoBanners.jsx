import { Link } from "react-router-dom";
import './PromoBanners.css'

function PromoBanners({ categories }) {

    const repuestos = categories.find((category) => category.description === 'Repuestos')
    const repuestosLink = repuestos ? `/catalogo?categoryId=${repuestos.id}` : '/catalogo'


    return (
    <section className="promo-banners">
      <Link to={repuestosLink} className="promo-banner promo-banner-parts">
        <div className="promo-banner-text">
          <span className="eyebrow">Repuestos</span>
          <h2 className="h2">La pieza que ya no se consigue</h2>
          <p className="small">Engranajes, perillas, clips y soportes impresos a medida.</p>
          <span className="small promo-banner-cta">Ver repuestos →</span>
        </div>
        <div className="promo-banner-shape promo-banner-ring" aria-hidden="true" />
      </Link>
      <Link to="/catalogo?maxPrice=10000" className="promo-banner promo-banner-gifts">
        <div className="promo-banner-text">
          <span className="eyebrow">Para regalar</span>
          <h2 className="h2">Regalos por menos de $&nbsp;10.000</h2>
          <p className="small">Dados, llaveros, soportes y figuras chicas.</p>
          <span className="small promo-banner-cta">Ver regalos →</span>
        </div>
        <div className="promo-banner-shape promo-banner-diamond" aria-hidden="true" />
      </Link>
    </section>
  )

}


export default PromoBanners