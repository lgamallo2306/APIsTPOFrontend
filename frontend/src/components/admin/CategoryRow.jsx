import './CategoryRow.css'

function CategoryRow({ category, onEdit, onDelete }) {
  return (
    <tr>
      <td>{category.id}</td>
      <td>{category.description}</td>
      <td>
        <div className="category-row-actions">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onEdit(category)}>Editar</button>
          <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(category)}>Eliminar</button>
        </div>
      </td>
    </tr>
  )
}

export default CategoryRow
