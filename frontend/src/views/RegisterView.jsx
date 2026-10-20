
import { useNavigate } from "react-router-dom"
import { register } from "../utils/api"
import AuthPanel from "../components/auth/AuthPanel"
import RegisterForm from "../components/auth/RegisterForm"
import './AuthView.css'
import { useState } from "react"
import { toast } from 'react-toastify'


function RegisterView({ onLogin }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = (data) => {
    if(data.firstname.trim() === '' || data.lastname.trim() === '' || data.email.trim() === '' || data.password === ''){
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

     return (
    <main className="auth-page">
      <AuthPanel />
      <section className="auth-side">
        <RegisterForm onSubmit={handleRegister} error={error} loading={loading} />
      </section>
    </main>
  )

}

export default RegisterView