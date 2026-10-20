import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../utils/api'
import LoginForm from './LoginForm'

function Login({ onLogin }) {
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

  return <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
}

export default Login