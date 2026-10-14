function ProductBasicFields({ form, categories, onChange }) {
  return (
    <>
      <div className="field">
        <label className="label" htmlFor="product-name">Nombre</label>
        <input id="product-name" className="input" name="name" placeholder="Ej.: Maceta autorregante 14 cm" value={form.name} onChange={onChange} />
      </div>
      <div className="field">
        <label className="label" htmlFor="product-description">Descripción</label>
        <textarea id="product-description" className="input product-data-form-textarea" rows="4" name="description" value={form.description} onChange={onChange} />
      </div>
      <div className="field">
        <label className="label" htmlFor="product-category">Categoría</label>
        <select id="product-category" className="input" name="categoryId" value={form.categoryId} onChange={onChange}>
          <option value="">Elegí una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.description}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default ProductBasicFields
