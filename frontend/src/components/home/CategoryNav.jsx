import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CategoryNav.css'

function CategoryNav({ categories }) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="category-nav" aria-label="Categorías">
      <div className="category-nav-menu">
        <button type="button" className="category-nav-toggle" onClick={() => setOpen(!open)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          Categorías
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={open ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'} />
          </svg>
        </button>
        {open && (
          <div className="card category-nav-dropdown">
            <Link to="/catalogo" className="navlink" onClick={() => setOpen(false)}>Todas las categorías</Link>
            {categories.map((category) => (
              <Link key={category.id} to={`/catalogo?categoryId=${category.id}`} className="navlink" onClick={() => setOpen(false)}>
                {category.description}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="category-nav-list">
        {categories.map((category) => (
          <Link key={category.id} to={`/catalogo?categoryId=${category.id}`} className="category-nav-link">
            {category.description}
          </Link>
        ))}
      </div>

      <div className="category-nav-extra">
        <Link to="/catalogo?sort=discount,desc" className="category-nav-link category-nav-offers">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
            <circle cx="7.5" cy="7.5" r="1.5" />
          </svg>
          Ofertas
        </Link>
        <Link to="/mis-compras" className="category-nav-link">Mis compras</Link>
      </div>
    </nav>
  )
}

export default CategoryNav