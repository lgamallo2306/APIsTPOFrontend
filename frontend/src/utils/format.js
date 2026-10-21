const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']


export const formatPrice = (value) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)


export const finalPrice = (price, discount) => price * (1 - discount / 100)

// "2026-09-30T14:20:00" → "30 sep 2026, 14:20"
export const formatDate = (iso) => {
  const d = new Date(iso)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}, ${hh}:${mm}`
}


export const countUnits = (items) => items.reduce((total, item) => total + item.quantity, 0)
