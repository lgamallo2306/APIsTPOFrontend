import AuthPanel from '../components/auth/AuthPanel'
import Register from '../components/auth/Register'
import './AuthView.css'

function RegisterView({ onLogin }) {
  return (
    <main className="auth-page">
      <AuthPanel />
      <section className="auth-side">
        <Register onLogin={onLogin} />
      </section>
    </main>
  )
}

export default RegisterView