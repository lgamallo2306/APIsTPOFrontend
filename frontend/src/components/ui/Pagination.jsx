import './Pagination.css'

function Pagination({ page, onChange }) {
  if (page.totalPages <= 1) return null

  return (
    <nav className="pager pagination" aria-label="Paginación">
      <button type="button" className="pg" disabled={page.first} onClick={() => onChange(page.number - 1)}>Anterior</button>
      <span className="small muted">Página {page.number + 1} de {page.totalPages}</span>
      <button type="button" className="pg" disabled={page.last} onClick={() => onChange(page.number + 1)}>Siguiente</button>
    </nav>
  )
}

export default Pagination
