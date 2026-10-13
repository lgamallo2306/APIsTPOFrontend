import './EmptyState.css'

function EmptyState({ title, text, children }) {
  return (
    <section className="empty-state">
      <div className="bed empty-state-art">
        <div className="empty-state-icon" />
      </div>
      <div className="empty-state-text">
        <h2 className="h2">{title}</h2>
        <p className="muted">{text}</p>
      </div>
      {children}
    </section>
  )
}

export default EmptyState
