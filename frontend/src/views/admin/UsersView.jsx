import UsersContainer from '../../components/admin/UsersContainer'

function UsersView({ token, onLogout }) {
  return (
    <main>
      <UsersContainer token={token} onLogout={onLogout} />
    </main>
  )
}

export default UsersView
