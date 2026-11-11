import './UserRoleCard.css'

const ROLES = ['USER', 'VENDOR', 'ADMIN']

// Tarjeta del usuario con sus roles: muestra Asignar o Quitar según cada rol
function UserRoleCard({ user, currentUser, roleError, onAssign, onRemove }) {
  const isSelf = currentUser.id === user.id

  return (
    <section className="card user-role-card">
      <h2 className="h2">{user.name} {user.surname}</h2>
      <p className="muted">{user.email} · {user.active ? 'Activo' : 'Inactivo'}</p>
      <ul className="user-role-list">
        {ROLES.map((role) => (
          <li key={role} className="user-role-row">
            <span className="badge">{role}</span>
            {user.roles.includes(role)
              ? <button type="button" className="btn btn-danger btn-sm" disabled={isSelf && role === 'ADMIN'} onClick={() => onRemove(role)}>Quitar</button>
              : <button type="button" className="btn btn-primary btn-sm" onClick={() => onAssign(role)}>Asignar</button>}
          </li>
        ))}
      </ul>
      {isSelf && user.roles.includes('ADMIN') && <p className="muted">No podés quitarte el rol ADMIN a vos mismo.</p>}
      {roleError && <p className="alert-err">{roleError}</p>}
    </section>
  )
}

export default UserRoleCard
