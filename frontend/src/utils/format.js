const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

// 15725 → "$ 15.725,00"
export const formatPrice = (value) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)

// precio con el descuento aplicado 
export const finalPrice = (price, discount) => price * (1 - discount / 100)

// "2026-09-30T14:20:00" → "30 sep 2026, 14:20"
export const formatDate = (iso) => {
  const d = new Date(iso)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}, ${hh}:${mm}`
}

// suma las cantidades de una lista de ítems (carrito u orden)
export const countUnits = (items) => items.reduce((total, item) => total + item.quantity, 0)
