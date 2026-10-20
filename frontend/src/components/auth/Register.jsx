import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../../utils/api'
import RegisterForm from './RegisterForm'

// Contenedor del registro: valida, llama al back y deja al usuario logueado
function Register({ onLogin }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (data) => {
    if (data.firstname.trim() === '' || data.lastname.trim() === '' || data.email.trim() === '' || data.password === '') {
      setError('Completá todos los campos.')
      return
    }

    setError('')
    setLoading(true)
    register(data)
      .then((res) => {
        onLogin(res.access_token)
        toast.success('¡Cuenta creada con éxito!')
        setLoading(false)
        navigate('/')
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  return <RegisterForm onSubmit={handleRegister} error={error} loading={loading} />
}

export default Register