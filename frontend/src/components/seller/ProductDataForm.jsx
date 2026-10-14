import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductBasicFields from './ProductBasicFields'
import ProductPriceFields from './ProductPriceFields'

// Pasa el producto del back a los valores del formulario (los inputs siempre trabajan con strings)
const productToForm = (product, categories, suggestedPrice) => {
  if (!product) {
    return { name: '', description: '', price: suggestedPrice ? String(suggestedPrice) : '', stock: '', discount: '0', categoryId: '' }
  }
  // el producto trae el nombre de la categoría, no el id: se busca en la lista
  const category = categories.find((item) => item.description === product.categoryName)
  return {
    name: product.name,
    description: product.description ? product.description : '',
    price: String(product.price),
    stock: String(product.stock),
    discount: String(product.discount),
    categoryId: category ? String(category.id) : '',
  }
}

function ProductDataForm({ product, categories, suggestedPrice, saving, error, onSave }) {
  const [form, setForm] = useState(productToForm(product, categories, suggestedPrice))
  const [validation, setValidation] = useState('')

  // cuando cambia el producto (se creó, se guardó o se pasó de editar a nuevo), el formulario se actualiza
  useEffect(() => {
    setForm(productToForm(product, categories, suggestedPrice))
    setValidation('')
  }, [product, categories, suggestedPrice])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setValidation('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const stock = Number(form.stock)
    const discount = Number(form.discount)
    if (form.name.trim() === '') {
      setValidation('El nombre es obligatorio.')
      return
    }
    if (form.price === '' || Number(form.price) <= 0) {
      setValidation('El precio tiene que ser mayor a 0.')
      return
    }
    if (form.stock === '' || stock < 0) {
      setValidation('El stock tiene que ser 0 o mayor.')
      return
    }
    if (discount < 0 || discount > 100) {
      setValidation('El descuento tiene que estar entre 0 y 100.')
      return
    }
    if (form.categoryId === '') {
      setValidation('Elegí una categoría.')
      return
    }
    onSave({
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      stock: stock,
      discount: discount,
      categoryId: Number(form.categoryId),
    })
  }

  let submitLabel = 'Crear producto'
  if (product) submitLabel = 'Guardar cambios'
  if (saving) submitLabel = 'Guardando…'

  return (
    <form className="card product-data-form" onSubmit={handleSubmit}>
      <h2 className="h3">Datos del producto</h2>
      {suggestedPrice && !product && <p className="alert-info">El precio viene de la calculadora. Podés cambiarlo.</p>}
      <ProductBasicFields form={form} categories={categories} onChange={handleChange} />
      <ProductPriceFields form={form} onChange={handleChange} />
      {(validation || error) && <p className="alert-err">{validation || error}</p>}
      <div className="product-data-form-actions">
        <Link to="/vendedor/productos" className="btn btn-ghost">Cancelar</Link>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ProductDataForm
