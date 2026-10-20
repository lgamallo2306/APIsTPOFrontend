import AuthPanel from '../components/auth/AuthPanel'
import Login from '../components/auth/Login'
import './AuthView.css'

function LoginView({ onLogin }) {
  return (
    <main className="auth-page">
      <AuthPanel />
      <section className="auth-side">
        <Login onLogin={onLogin} />
      </section>
    </main>
  )
}

export default LoginView