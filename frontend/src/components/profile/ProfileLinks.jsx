import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logout } from '../../redux/authSlice'


function ProfileLinks({ roles }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isVendor = roles.includes('VENDOR') || roles.includes('ADMIN')
  const isAdmin = roles.includes('ADMIN')

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    toast.info('Cerraste sesión')
    navigate('/')
  }

  return (
    <aside className="profile-links">
      <span className="eyebrow">Accesos</span>
      {isVendor && (
        <Link to="/vendedor/productos" className="card profile-link">
          <span className="profile-link-title">Panel vendedor</span>
          <span className="small muted">Productos, precios y ventas</span>
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin/categorias" className="card profile-link">
          <span className="profile-link-title">Administración</span>
          <span className="small muted">Categorías y usuarios</span>
        </Link>
      )}
      <Link to="/mis-compras" className="card profile-link">
        <span className="profile-link-title">Mis compras</span>
        <span className="small muted">Historial de órdenes</span>
      </Link>
      <button type="button" className="btn btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
    </aside>
  )
}

export default ProfileLinks
