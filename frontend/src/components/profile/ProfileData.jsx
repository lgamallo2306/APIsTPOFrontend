function ProfileData({ user }) {
  return (
    <section className="card profile-data">
      <h2 className="h3">Datos de la cuenta</h2>
      <div className="kv profile-data-row">
        <span className="small muted">Nombre</span>
        <span>{user.name}</span>
      </div>
      <div className="kv profile-data-row">
        <span className="small muted">Apellido</span>
        <span>{user.surname}</span>
      </div>
      <div className="kv profile-data-row">
        <span className="small muted">Email</span>
        <span>{user.email}</span>
      </div>
    </section>
  )
}

export default ProfileData
