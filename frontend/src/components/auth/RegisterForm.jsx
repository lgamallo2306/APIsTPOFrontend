import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../ui/PasswordInput'
import './RegisterForm.css'

function RegisterForm({ onSubmit, error, loading }) {
  const [form, setForm] = useState({ email: '', password: '',firstName:'', lastName:'' })

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
        <label className="label" htmlFor="firstName">FirstName</label>
        <input id="firstName" name="firstName" type="text" className="input" value={form.firstName} onChange={handleChange} />
      </div>
      
      <div className="field">
        <label className="label" htmlFor="lastName">LastName</label>
        <input id="lastName" name="lastName" type="text" className="input" value={form.lastName} onChange={handleChange} />
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