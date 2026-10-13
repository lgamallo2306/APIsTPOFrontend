import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() === '') {
      navigate('/')
      return
    }
    navigate(`/?name=${encodeURIComponent(text.trim())}`)
  }

  return (
    <form className="affix search" onSubmit={handleSubmit}>
      <span className="ico">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </span>
      <input
        className="input search-input"
        type="search"
        placeholder="Buscar macetas, repuestos, figuras…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}

export default SearchBar