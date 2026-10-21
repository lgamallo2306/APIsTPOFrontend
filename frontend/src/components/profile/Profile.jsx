import ProfileData from './ProfileData'
import ProfileLinks from './ProfileLinks'
import ProfileSettings from './ProfileSettings'
import './Profile.css'


// Los cambios de la cuenta salen de ProfileSettings
function Profile({ user, token, onUserChange, onTokenChange, onLogout }) {
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
        <ProfileSettings user={user} token={token} onUserChange={onUserChange} onTokenChange={onTokenChange} onLogout={onLogout} />
      </div>
      <ProfileLinks roles={user.roles} onLogout={onLogout} />
    </div>
  )
}

export default Profile
