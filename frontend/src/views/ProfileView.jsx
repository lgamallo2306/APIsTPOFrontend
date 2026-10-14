import Profile from '../components/profile/Profile'

function ProfileView({ user, onLogout }) {
  return (
    <main>
      <Profile user={user} onLogout={onLogout} />
    </main>
  )
}

export default ProfileView
