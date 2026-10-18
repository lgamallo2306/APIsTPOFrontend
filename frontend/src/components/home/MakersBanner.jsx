import { Link } from 'react-router-dom'
import './MakersBanner.css'

const PASOS = [
  { titulo: 'Calculá el precio', texto: 'Elegí material, peso y horas. Te sugerimos un precio con tu margen.' },
  { titulo: 'Publicá tu pieza', texto: 'Cargá fotos, stock y categoría en un par de minutos.' },
  { titulo: 'Vendé y coordiná', texto: 'Ves cada venta en tu panel y coordinás la entrega con el comprador.' },
]

function MakersBanner({ user }) {
  const isVendor = user && (user.roles.includes('VENDOR') || user.roles.includes('ADMIN'))

  return (
    <section className="makers-banner">
      <div className="makers-banner-text">
        <span className="eyebrow makers-banner-eyebrow">Para makers</span>
        <h2 className="display makers-banner-title">¿Imprimís en 3D? Vendé tus piezas.</h2>
        {isVendor
          ? <Link to="/vendedor/productos" className="btn btn-primary">Ir a mi panel</Link>
          : <Link to="/registro" className="btn btn-primary">Quiero vender</Link>}
      </div>
      <ol className="makers-banner-steps">
        {PASOS.map((paso, index) => (
          <li key={paso.titulo} className="makers-banner-step">
            <span className="eyebrow makers-banner-eyebrow">Paso {index + 1}</span>
            <span className="makers-banner-step-title">{paso.titulo}</span>
            <span className="small makers-banner-step-text">{paso.texto}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default MakersBanner