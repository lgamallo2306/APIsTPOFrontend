import { useState } from 'react'
import PasswordInput from '../ui/PasswordInput'
import './RegisterForm.css'

function RegisterForm({ onSubmit, error, loading }) {
  // los name coinciden con el DTO del back (RegisterRequest): firstname, lastname
  const [form, setForm] = useState({ email: '', password: '', firstname: '', lastname: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="RegisterForm">
        <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-title">
        <h1 className="h1">Registrate</h1>
      </div>

      <div className="field">
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="input" value={form.email} onChange={handleChange} />
      </div>

      <div className="field">
        <label className="label" htmlFor="password">Contraseña</label>
        <PasswordInput id="password" name="password" value={form.password} onChange={handleChange} />
      </div>
      
      <div className="field">
        <label className="label" htmlFor="firstname">Nombre</label>
        <input id="firstname" name="firstname" type="text" className="input" value={form.firstname} onChange={handleChange} />
      </div>
      
      <div className="field">
        <label className="label" htmlFor="lastname">Apellido</label>
        <input id="lastname" name="lastname" type="text" className="input" value={form.lastname} onChange={handleChange} />
      </div>

      {error && <p className="alert-err">{error}</p>}

      <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
        {loading ? 'Registrando…' : 'Registrar'}
      </button>
    </form>
    </div>
    
  )
}

export default RegisterForm