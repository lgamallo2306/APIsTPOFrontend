import { useState } from 'react'

function UserSearchForm({ onSearch }) {
  const [form, setForm] = useState({ email: '' })
  const [validation, setValidation] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.email.trim() === '') {
      setValidation('Ingresá un email.')
      return
    }
    onSearch(form.email.trim())
  }

  return (
    <form className="user-search-form" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="user-search-email">Email del usuario</label>
        <input
          id="user-search-email"
          className="input"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      {validation && <p className="alert-err">{validation}</p>}
      <button type="submit" className="btn btn-primary">Buscar</button>
    </form>
  )
}

export default UserSearchForm
