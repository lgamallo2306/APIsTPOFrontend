import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '../utils/api'
import AuthPanel from '../components/auth/AuthPanel'
import LoginForm from '../components/auth/LoginForm'
import './AuthView.css'
import { toast } from 'react-toastify'

function LoginView({ onLogin }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state && location.state.from ? location.state.from : '/'

  const handleLogin = (credentials) => {
    if (credentials.email.trim() === '' || credentials.password === '') {
      setError('Completá el email y la contraseña.')
      return
    }

    setError('')
    setLoading(true)
    login(credentials)
      .then((data) => {
        onLogin(data.access_token)
        toast.success('Sesión iniciada')
        setLoading(false)
        if (location.pathname === '/login') navigate(from)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  return (
    <main className="auth-page">
      <AuthPanel />
      <section className="auth-side">
        <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
      </section>
    </main>
  )
}

export default LoginView
