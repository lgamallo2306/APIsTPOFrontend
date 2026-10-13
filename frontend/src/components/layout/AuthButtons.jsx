import { Link } from 'react-router-dom'

function AuthButtons() {
  return (
    <>
      <Link to="/login" className="btn btn-ghost btn-sm">Ingresar</Link>
      <Link to="/registro" className="btn btn-primary btn-sm">Crear cuenta</Link>
    </>
  )
}

export default AuthButtons