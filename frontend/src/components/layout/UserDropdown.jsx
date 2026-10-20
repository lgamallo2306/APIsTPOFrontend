import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './UserDropdown.css'

function UserDropdown({ user, initials, onLogout, onClose }) {
  const navigate = useNavigate()
  const isVendor = user.roles.includes('VENDOR') || user.roles.includes('ADMIN')
  const isAdmin = user.roles.includes('ADMIN')

  const handleLogout = () => {
    onClose()
    onLogout()
    toast.info('Cerraste sesión')
    navigate('/')
  }

  return (
    <div className="card user-dropdown">
      <div className="user-dropdown-head">
        <span className="avatar">{initials}</span>
        <div>
          <p className="user-fullname">{user.name} {user.surname}</p>
          <div className="user-roles">
            {user.roles.map((role) => (
              <span key={role} className="badge b-role">{role}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="divider" />
      <Link to="/mis-compras" className="navlink" onClick={onClose}>Mis compras</Link>
      <Link to="/perfil" className="navlink" onClick={onClose}>Perfil</Link>

      {isVendor && (
        <>
          <div className="divider" />
          <Link to="/vendedor/productos" className="navlink" onClick={onClose}>Mis productos</Link>
          <Link to="/vendedor/ventas" className="navlink" onClick={onClose}>Mis ventas</Link>
        </>
      )}

      {isAdmin && (
        <>
          <div className="divider" />
          <Link to="/admin/categorias" className="navlink" onClick={onClose}>Categorías</Link>
          <Link to="/admin/usuarios" className="navlink" onClick={onClose}>Usuarios</Link>
        </>
      )}

      <div className="divider" />
      <button type="button" className="navlink logout" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default UserDropdown