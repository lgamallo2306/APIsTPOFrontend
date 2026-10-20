import { Link } from "react-router-dom";
import Logo from "./Logo";
import './Footer.css'

const COLUMNAS = [
  {
    titulo: 'Comprar',
    links: [
      { to: '/catalogo', label: 'Catálogo' },
      { to: '/catalogo?sort=discount,desc', label: 'Ofertas' },
    ],
  },
  {
    titulo: 'Vender',
    links: [
      { to: '/registro', label: 'Quiero vender' },
      { to: '/vendedor/calculadora', label: 'Calculadora de precio' },
      { to: '/vendedor/productos', label: 'Panel vendedor' },
    ],
  },
  {
    titulo: 'Mi cuenta',
    links: [
      { to: '/mis-compras', label: 'Mis compras' },
      { to: '/carrito', label: 'Carrito' },
      { to: '/perfil', label: 'Perfil' },
    ],
  },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo />
          <p className="small muted">Marketplace de piezas impresas en 3D. Cada producto lo imprime y lo vende un maker independiente.</p>
        </div>
        <div className="footer-columns">
          {COLUMNAS.map((columna) => (
            <div key={columna.titulo} className="footer-column">
              <span className="eyebrow">{columna.titulo}</span>
              {columna.links.map((link) => (
                <Link key={link.to} to={link.to} className="small footer-link">{link.label}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="small muted footer-bottom">© 2026 3d · Precios en pesos argentinos (ARS)</p>
    </footer>
  )
}

export default Footer