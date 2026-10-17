
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../ui/PasswordInput'
import './AuthForm.css'


function RegisterForm({ onSubmit, error, loading}) {


  const [form, setForm] = useState({firstname: '', lastname: '', email: '', password: '', role: 'USER' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value})

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form-title">
        <h1 className="h1">Crear cuenta</h1>
        <p className="muted">
          ¿Ya tenés cuenta? <Link to="/login">Ingresá</Link>
        </p>
      </div>

      <div className="field">
        <label className="label" htmlFor="firstname">Nombre</label>
        <input id="firstname" name="firstname" type="text" className="input" value={form.firstname} onChange={handleChange} />
      </div>

      <div className="field">
        <label className="label" htmlFor="lastname">Apellido</label>
        <input id="lastname" name="lastname" type="text" className="input" value={form.lastname} onChange={handleChange} />
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
        <label className="label" htmlFor="role">Tipo de cuenta</label>
        <select id="role" name="role" className="input" value={form.role} onChange={handleChange}>
          <option value="USER">Quiero comprar</option>
          <option value="VENDOR">Quiero comprar y vender</option>
        </select>
      </div>

      {error && <p className="alert-err">{error}</p>}

      <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
        {loading ? 'Creando cuenta…' : 'Crear cuenta'}
      </button>
    </form>
  )
}

export default RegisterForm