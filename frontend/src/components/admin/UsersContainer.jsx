import { useState } from 'react'
import { getUserByEmail, assignRole, removeRole } from '../../utils/api'
import EmptyState from '../ui/EmptyState'
import Toast from '../ui/Toast'
import UserSearchForm from './UserSearchForm'
import UserRoleCard from './UserRoleCard'
import './UsersContainer.css'

function UsersContainer({ token, onLogout }) {
  const [user, setUser] = useState(null)
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [roleError, setRoleError] = useState('')
  const [toast, setToast] = useState('')

  const handleSearch = (email) => {
    setSearching(true)
    setSearchError('')
    setRoleError('')
    setUser(null)
    getUserByEmail(token, email)
      .then((data) => {
        setUser(data)
        setSearching(false)
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) onLogout()
        setSearchError(err.message)
        setSearching(false)
      })
  }

  // el back no devuelve el usuario al cambiar un rol: se actualiza el estado local con el cambio
  const handleAssign = (role) => {
    assignRole(token, user.id, role)
      .then(() => {
        setUser({ ...user, roles: [...user.roles, role] })
        setRoleError('')
        setToast(`Rol ${role} asignado`)
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) onLogout()
        setRoleError(err.message)
      })
  }

  const handleRemove = (role) => {
    removeRole(token, user.id, role)
      .then(() => {
        setUser({ ...user, roles: user.roles.filter((item) => item !== role) })
        setRoleError('')
        setToast(`Rol ${role} quitado`)
      })
      .catch((err) => {
        if (err.status === 401 || err.status === 403) onLogout()
        setRoleError(err.message)
      })
  }

  let result = <EmptyState title="Buscá un usuario" text="Ingresá su email para ver y cambiar sus roles." />
  if (searching) result = <div className="skel users-skeleton" />
  else if (searchError) result = <p className="alert-err">{searchError}</p>
  else if (user) result = <UserRoleCard user={user} roleError={roleError} onAssign={handleAssign} onRemove={handleRemove} />

  return (
    <section className="users-admin">
      <h1 className="h1">Usuarios</h1>
      <UserSearchForm onSearch={handleSearch} />
      {result}
      {toast !== '' && <Toast message={toast} onClose={() => setToast('')} />}
    </section>
  )
}

export default UsersContainer
