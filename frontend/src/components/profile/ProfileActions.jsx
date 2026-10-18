// Botones para abrir cada modal de la cuenta; ProfileSettings decide cuál mostrar
function ProfileActions({ onOpen }) {
  return (
    <section className="card profile-data">
      <h2 className="h3">Configuración de la cuenta</h2>
      <div className="profile-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onOpen('name')}>Editar nombre</button>
        <button type="button" className="btn btn-secondary" onClick={() => onOpen('email')}>Cambiar email</button>
        <button type="button" className="btn btn-secondary" onClick={() => onOpen('password')}>Cambiar contraseña</button>
        <button type="button" className="btn btn-danger" onClick={() => onOpen('deactivate')}>Dar de baja la cuenta</button>
      </div>
    </section>
  )
}

export default ProfileActions
