import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/carrito">Carrito</Link>
          </li>
          <li>
            <Link to="/login">Ingresar</Link>
          </li>
          <li>
            <Link to="/registro">Crear cuenta</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header