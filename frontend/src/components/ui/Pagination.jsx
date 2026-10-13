import './Pagination.css'

function Pagination({ page, onChange }) {
  const pages = [...Array(page.totalPages).keys()].map((n) => ({ id: n }))
  const from = page.number * page.size + 1
  const to = from + page.content.length - 1

  return (
    <nav className="pagination" aria-label="Paginación">
      <span className="small muted">Mostrando {from}–{to} de {page.totalElements}</span>
      {page.totalPages > 1 && (
        <div className="pager">
          <button type="button" className="pg" disabled={page.first} onClick={() => onChange(page.number - 1)}>Anterior</button>
          {pages.map((item) => (
            <button key={item.id} type="button" className={item.id === page.number ? 'pg on pagination-num' : 'pg pagination-num'} onClick={() => onChange(item.id)}>
              {item.id + 1}
            </button>
          ))}
          <button type="button" className="pg" disabled={page.last} onClick={() => onChange(page.number + 1)}>Siguiente</button>
        </div>
      )}
    </nav>
  )
}

export default Pagination
