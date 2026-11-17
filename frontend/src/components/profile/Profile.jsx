import { useSelector } from 'react-redux'
import ProfileData from './ProfileData'
import ProfileLinks from './ProfileLinks'
import ProfileSettings from './ProfileSettings'
import './Profile.css'


// Los cambios de la cuenta salen de ProfileSettings
function Profile() {
  const user = useSelector((state) => state.auth.user)
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
        <ProfileSettings />
      </div>
      <ProfileLinks roles={user.roles} />
    </div>
  )
}

export default Profile
