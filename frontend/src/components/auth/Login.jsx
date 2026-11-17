import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { login, clearError } from '../../redux/authSlice'
import LoginForm from './LoginForm'

function Login() {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)
  const error = useSelector((state) => state.auth.error)
  const [formError, setFormError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state && location.state.from ? location.state.from : '/'

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const handleLogin = (credentials) => {
    if (credentials.email.trim() === '' || credentials.password === '') {
      setFormError('Completá el email y la contraseña.')
      return
    }

    setFormError('')
    dispatch(login(credentials)).then((result) => {
      if (result.error) return
      toast.success('Sesión iniciada')
      if (location.pathname === '/login') navigate(from)
    })
  }

  return <LoginForm onSubmit={handleLogin} error={formError !== '' ? formError : error} loading={loading} />
}

export default Login