import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../ui/PasswordInput'
import './AuthForm.css'


function LoginForm({ onSubmit, error, loading }) {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-title">
        <h1 className="h1">Ingresar</h1>
        
      </div>

      <div className="field">
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" className="input" value={form.email} onChange={handleChange} />
      </div>

      <div className="field">
        <label className="label" htmlFor="password">Contraseña</label>
        <PasswordInput id="password" name="password" value={form.password} onChange={handleChange} />
      </div>

      {error && <p className="alert-err">{error}</p>}

      <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
        {loading ? 'Ingresando…' : 'Ingresar'}
      </button>

      <p className="muted">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
      </p>
    
    </form>
  )
}

export default LoginForm
