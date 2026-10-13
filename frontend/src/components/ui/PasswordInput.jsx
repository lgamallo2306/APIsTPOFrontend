import { useState } from 'react'
import './PasswordInput.css'

// Input de contraseña con el botón del ojo para mostrarla u ocultarla.
function PasswordInput({ id, name, value, onChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="affix">
      <input
        id={id}
        name={name}
        className="input"
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="affix-btn"
        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        onClick={() => setVisible(!visible)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </div>
  )
}

export default PasswordInput
