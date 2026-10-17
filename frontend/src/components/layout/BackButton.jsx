// BackButton.jsx
import { useNavigate } from 'react-router-dom'
import './BackButton.css'

function BackButton() {
  const navigate = useNavigate()
  return (
    <button type="button" className="back-button" onClick={() => navigate(-1)}>
      ← Volver
    </button>
  )
}

export default BackButton