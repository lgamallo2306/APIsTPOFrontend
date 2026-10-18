import Profile from '../components/profile/Profile'

function ProfileView({ user, token, onUserChange, onTokenChange, onLogout }) {
  return (
    <main>
      <Profile user={user} token={token} onUserChange={onUserChange} onTokenChange={onTokenChange} onLogout={onLogout} />
    </main>
  )
}

export default ProfileView
