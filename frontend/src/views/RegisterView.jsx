import AuthPanel from '../components/auth/AuthPanel'
import Register from '../components/auth/Register'
import './AuthView.css'

function RegisterView() {
  return (
    <main className="auth-page">
      <AuthPanel />
      <section className="auth-side">
        <Register />
      </section>
    </main>
  )
}

export default RegisterView