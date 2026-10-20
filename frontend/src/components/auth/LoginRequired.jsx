import { useNavigate, useLocation } from 'react-router-dom'
import EmptyState from '../ui/EmptyState'

const MENSAJES = {
  '/carrito': 'Ingresá a tu cuenta para ver tu carrito y terminar la compra.',
  '/mis-compras': 'Ingresá a tu cuenta para ver el historial de tus compras.',
  '/perfil': 'Ingresá a tu cuenta para ver y editar tus datos.',
}

// Se muestra en las rutas que piden sesión, en lugar de saltar directo al login
function LoginRequired() {
  const navigate = useNavigate()
  const location = useLocation()
  const text = MENSAJES[location.pathname] ? MENSAJES[location.pathname] : 'Ingresá a tu cuenta para ver esta sección.'

  return (
    <main className="container">
      <EmptyState
        title="Necesitás iniciar sesión"
        text={text}
        actionLabel="Ingresar"
        onAction={() => navigate('/login', { state: { from: location.pathname } })}
      />
    </main>
  )
}

export default LoginRequired