import { Link, useLocation } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  const location = useLocation()

  return (
    <section className="not-found bed">
      <span className="eyebrow">Error 404</span>
      <p className="display not-found-code">404</p>
      <h1 className="h1">No encontramos esta página</h1>
      <p className="muted not-found-text">
        La dirección <span className="mono">{location.pathname}</span> no existe. Revisá que esté bien escrita o seguí desde el inicio.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">Ir al inicio</Link>
        <Link to="/catalogo" className="btn btn-secondary">Ver catálogo</Link>
      </div>
    </section>
  )
}

export default NotFound
