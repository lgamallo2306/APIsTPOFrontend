import Logo from '../layout/Logo'


const CAPAS = [180, 260, 340, 420, 500]

function AuthPanel() {
  return (
    <section className="auth-panel bed">
      <Logo />
      <div className="auth-layers">
        {CAPAS.map((ancho, index) => (
          <div
            key={ancho}
            className="auth-layer"
            style={{ width: ancho, background: index % 2 === 0 ? 'var(--accent)' : 'var(--text)' }}
          />
        ))}
      </div>
      <div className="auth-claim">
        <p className="display">Capa por capa, de un taller a tu casa.</p>
        <p className="muted">Comprá piezas impresas en 3D o publicá las tuyas con un precio calculado en segundos.</p>
      </div>
    </section>
  )
}

export default AuthPanel
