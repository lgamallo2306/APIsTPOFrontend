import { useState } from 'react'
import UserDropdown from './UserDropdown'

function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const initials = user.name[0] + user.surname[0]

  return (
    <div className="user-menu">
      <button type="button" className="btn btn-ghost user-btn" onClick={() => setOpen(!open)}>
        <span className="avatar">{initials}</span>
        <span className="user-name">{user.name}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <UserDropdown user={user} initials={initials} onLogout={onLogout} onClose={() => setOpen(false)} />}
    </div>
  )
}

export default UserMenu