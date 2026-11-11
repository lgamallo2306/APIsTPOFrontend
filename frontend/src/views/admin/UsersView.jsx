import UsersContainer from '../../components/admin/UsersContainer'

function UsersView({ token, currentUser, onLogout }) {
  return (
    <main>
      <UsersContainer token={token} currentUser={currentUser} onLogout={onLogout} />
    </main>
  )
}

export default UsersView
