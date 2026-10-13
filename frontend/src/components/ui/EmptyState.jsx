import './EmptyState.css'

function EmptyState({ title, text, actionLabel, onAction }) {
  return (
    <section className="empty-state">
      <div className="bed empty-state-art">
        <div className="empty-state-icon" />
      </div>
      <div className="empty-state-text">
        <h2 className="h2">{title}</h2>
        <p className="muted">{text}</p>
      </div>
      {actionLabel && <button type="button" className="btn btn-primary" onClick={onAction}>{actionLabel}</button>}
    </section>
  )
}

export default EmptyState
