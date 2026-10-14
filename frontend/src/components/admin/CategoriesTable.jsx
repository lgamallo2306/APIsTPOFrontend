import CategoryRow from './CategoryRow'

function CategoriesTable({ categories, onEdit, onDelete }) {
  return (
    <div className="card scroll">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <CategoryRow key={category.id} category={category} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesTable
