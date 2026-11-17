import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { fetchUserByEmail, assignRole, removeRole } from '../../redux/adminSlice'
import EmptyState from '../ui/EmptyState'
import UserSearchForm from './UserSearchForm'
import UserRoleCard from './UserRoleCard'
import './UsersContainer.css'

// Panel de usuarios: la búsqueda, el usuario y los errores viven en el store (adminSlice)
function UsersContainer() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const currentUser = useSelector((state) => state.auth.user)
  const admin = useSelector((state) => state.admin)

  const handleSearch = (email) => {
    dispatch(fetchUserByEmail({ token, email }))
  }

  // dispatch devuelve la acción final: si falló, no se muestra el aviso de éxito
  const handleAssign = (role) => {
    dispatch(assignRole({ token, userId: admin.user.id, role })).then((action) => {
      if (action.error) return
      toast.success(`Rol ${role} asignado`)
    })
  }

  const handleRemove = (role) => {
    dispatch(removeRole({ token, userId: admin.user.id, role })).then((action) => {
      if (action.error) return
      toast.success(`Rol ${role} quitado`)
    })
  }

  let result = <EmptyState title="Buscá un usuario" text="Ingresá su email para ver y cambiar sus roles." />
  if (admin.loading) result = <div className="skel users-skeleton" />
  else if (admin.error) result = <p className="alert-err">{admin.error}</p>
  else if (admin.user) result = <UserRoleCard user={admin.user} currentUser={currentUser} roleError={admin.roleError} onAssign={handleAssign} onRemove={handleRemove} />

  return (
    <section className="users-admin">
      <h1 className="h1">Usuarios</h1>
      <UserSearchForm onSearch={handleSearch} />
      {result}
    </section>
  )
}

export default UsersContainer
