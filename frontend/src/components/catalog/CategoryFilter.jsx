import { useSelector } from 'react-redux'
import './CategoryFilter.css'

function CategoryFilter({ value, onChange }) {
  const categories = useSelector((state) => state.categories.items)
  const options = [{ id: '', description: 'Todas' }, ...categories]

  return (
    <fieldset className="category-filter">
      <legend className="label">Categoría</legend>
      {options.map((category) => (
        <label key={category.id} className="category-filter-option">
          <input
            type="radio"
            name="categoryId"
            value={category.id}
            checked={value === String(category.id)}
            onChange={onChange}
          />
          {category.description}
        </label>
      ))}
    </fieldset>
  )
}

export default CategoryFilter
