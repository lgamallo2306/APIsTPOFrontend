import MySales from '../components/seller/MySales'
import './MySalesView.css'

function MySalesView({ token }) {
  return (
    <main className="sales-view">
      <div className="sales-view-title">
        <span className="eyebrow">Panel vendedor</span>
        <h1 className="h1">Mis ventas</h1>
      </div>
      <MySales token={token} />
    </main>
  )
}

export default MySalesView
