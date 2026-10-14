import ProfileData from './ProfileData'
import ProfileLinks from './ProfileLinks'
import './Profile.css'

// Los datos ya están en App (GET /users/me): el perfil solo los muestra, sin otro pedido al back
function Profile({ user, onLogout }) {
  return (
    <div className="profile">
      <div className="profile-main">
        <div className="layers profile-head">
          <span className="avatar profile-avatar">{user.name[0] + user.surname[0]}</span>
          <div>
            <h1 className="h1">{user.name} {user.surname}</h1>
            <span className="muted small">{user.email}</span>
          </div>
        </div>
        <ProfileData user={user} />
      </div>
      <ProfileLinks roles={user.roles} onLogout={onLogout} />
    </div>
  )
}

export default Profile
