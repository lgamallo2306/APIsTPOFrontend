const OPTIONS = [
  { id: 'price,asc', label: 'Precio: menor a mayor' },
  { id: 'price,desc', label: 'Precio: mayor a menor' },
  { id: 'name,asc', label: 'Nombre: A–Z' },
  { id: 'name,desc', label: 'Nombre: Z–A' },
]

function SortDropdown({ value, onChange }) {
  return (
    <div className="field">
      <label className="label" htmlFor="sort">Ordenar por</label>
      <select id="sort" name="sort" className="input" value={value} onChange={onChange}>
        {OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default SortDropdown
