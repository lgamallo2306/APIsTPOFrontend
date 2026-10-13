function StockBadge({ stock }) {
  if (stock === 0) return <span className="badge b-nostock">Sin stock</span>
  if (stock <= 3) return <span className="badge b-low">Últimas {stock}</span>
  return null
}

export default StockBadge
