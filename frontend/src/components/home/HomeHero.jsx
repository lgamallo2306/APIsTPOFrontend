import { Link } from "react-router-dom";
import './HomeHero.css'

const CAPAS = [120, 180, 240, 300, 360]

function HomeHero(){
      return (
    <section className="home-hero">
      <div className="home-hero-text">
        <span className="badge b-accent">Impreso a pedido</span>
        <h1 className="display">Piezas impresas en 3D, de un taller a tu casa.</h1>
        <p className="home-hero-lead">Figuras, repuestos, macetas y accesorios hechos por makers de todo el país.</p>
        <div className="home-hero-actions">
          <Link to="/catalogo" className="btn btn-primary">Ver catálogo</Link>
          <Link to="/catalogo?sort=discount,desc" className="btn home-hero-secondary">Ver ofertas</Link>
        </div>
      </div>
      <div className="home-hero-layers" aria-hidden="true">
        {CAPAS.map((ancho, index) => (
          <div
            key={ancho}
            className={index % 2 === 0 ? 'home-hero-layer home-hero-layer-accent' : 'home-hero-layer'}
            style={{ width: ancho }}
          />
        ))}
      </div>
    </section>
  )
}

export default HomeHero
