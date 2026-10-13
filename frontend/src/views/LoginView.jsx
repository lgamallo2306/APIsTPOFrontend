import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { login } from '../utils/api'
import AuthPanel from '../components/auth/AuthPanel'
import LoginForm from '../components/auth/LoginForm'

function LoginView({ onLogin }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
        // Si entró por /login lo mando al catálogo. Si llegó acá desde una
        // ruta protegida (ej. /carrito), se queda: App mostrará esa vista.
        setLoading(false)
        if (location.pathname === '/login') navigate('/')
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
