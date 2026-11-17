import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { register, clearError } from '../../redux/authSlice'
import RegisterForm from './RegisterForm'

// Contenedor del registro: valida, llama al back y deja al usuario logueado
function Register() {
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

  const handleRegister = (data) => {
    if (data.firstname.trim() === '' || data.lastname.trim() === '' || data.email.trim() === '' || data.password === '') {
      setFormError('Completá todos los campos.')
      return
    }

    setFormError('')
    dispatch(register(data)).then((result) => {
      if (result.error) return
      toast.success('¡Cuenta creada con éxito!')
      navigate(from)
    })
  }

  return <RegisterForm onSubmit={handleRegister} error={formError !== '' ? formError : error} loading={loading} />
}

export default Register