import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct, updateProduct, uploadProductImage } from '../../utils/api'
import { toast } from 'react-toastify'
import ProductDataForm from './ProductDataForm'
import ProductImageUploader from './ProductImageUploader'


const ERROR_GENERICO = 'No pudimos completar la operación. Intentá de nuevo en unos segundos.'


function ProductEditorPanel({ token, categories, onLogout, product, suggestedPrice, onProductChange }) {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [imageError, setImageError] = useState('')

  const checkSession = (err) => {
    if (err.status === 401 || err.status === 403) onLogout()
  }

  // al editar no se manda imageUrls: así el back deja las imágenes como están
  const handleSave = (data) => {
    setSaving(true)
    setSaveError('')
    const request = product ? updateProduct(token, product.id, data) : createProduct(token, data)
    request
      .then((saved) => {
        setSaving(false)
        if (product) {
          onProductChange(saved)
          toast.success('Cambios guardados')
          return
        }
        // con el id nuevo la URL pasa a ser la de edición y se habilitan las imágenes
        navigate(`/vendedor/productos/${saved.id}`, { state: { product: saved } })
        toast.success('Producto creado. Ahora podés agregar imágenes.')
      })
      .catch((err) => {
        checkSession(err)
        setSaveError(err.message ? err.message : ERROR_GENERICO)
        setSaving(false)
      })
  }

  const handleUpload = (file) => {
    setUploading(true)
    setImageError('')
    uploadProductImage(token, product.id, file)
      .then((updated) => {
        onProductChange(updated)
        setUploading(false)
      })
      .catch((err) => {
        checkSession(err)
        setImageError(err.message ? err.message : ERROR_GENERICO)
        setUploading(false)
      })
  }

  
  const handleRemoveImage = (url) => {
    const category = categories.find((item) => item.description === product.categoryName)
    setImageError('')
    updateProduct(token, product.id, {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      discount: product.discount,
      categoryId: category ? category.id : null,
      imageUrls: product.imageUrls.filter((imageUrl) => imageUrl !== url),
    })
      .then((updated) => onProductChange(updated))
      .catch((err) => {
        checkSession(err)
        setImageError(err.message ? err.message : ERROR_GENERICO)
      })
  }

  return (
    <div className="product-editor">
      <ProductDataForm
        product={product}
        categories={categories}
        suggestedPrice={suggestedPrice}
        saving={saving}
        error={saveError}
        onSave={handleSave}
      />
      <ProductImageUploader
        product={product}
        uploading={uploading}
        error={imageError}
        onUpload={handleUpload}
        onRemove={handleRemoveImage}
      />
    </div>
  )
}

export default ProductEditorPanel
