import { Link } from 'react-router-dom'

// Logo de 3d: tres "capas" de impresión + el nombre. Lleva al catálogo.
function Logo() {
  return (
    <Link to="/" className="logo">
      <svg width="36" height="36" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="3" y="18.5" width="22" height="5.5" rx="2.75" fill="var(--accent)" />
        <rect x="5.5" y="11.25" width="17" height="5.5" rx="2.75" fill="var(--text)" />
        <rect x="8" y="4" width="12" height="5.5" rx="2.75" fill="var(--accent)" />
      </svg>
      <span className="logo-text">3d</span>
    </Link>
  )
}

export default Logo
