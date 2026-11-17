import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, updateProduct, uploadProductImage } from '../../redux/sellerSlice'
import { toast } from 'react-toastify'
import ProductDataForm from './ProductDataForm'
import ProductImageUploader from './ProductImageUploader'


const ERROR_GENERICO = 'No pudimos completar la operación. Intentá de nuevo en unos segundos.'


function ProductEditorPanel({ product, suggestedPrice }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const categories = useSelector((state) => state.categories.items)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [imageError, setImageError] = useState('')

  // al editar no se manda imageUrls: así el back deja las imágenes como están
  const handleSave = (data) => {
    setSaving(true)
    setSaveError('')
    const action = product
      ? updateProduct({ token, id: product.id, product: data })
      : createProduct({ token, product: data })
    dispatch(action).then((result) => {
      setSaving(false)
      if (result.error) {
        setSaveError(result.error.message ? result.error.message : ERROR_GENERICO)
        return
      }
      if (product) {
        toast.success('Cambios guardados')
        return
      }
      // con el id nuevo la URL pasa a ser la de edición y se habilitan las imágenes
      navigate(`/vendedor/productos/${result.payload.id}`)
      toast.success('Producto creado. Ahora podés agregar imágenes.')
    })
  }

  const handleUpload = (file) => {
    setUploading(true)
    setImageError('')
    dispatch(uploadProductImage({ token, id: product.id, file })).then((result) => {
      setUploading(false)
      if (result.error) {
        setImageError(result.error.message ? result.error.message : ERROR_GENERICO)
      }
    })
  }


  const handleRemoveImage = (url) => {
    const category = categories.find((item) => item.description === product.categoryName)
    setImageError('')
    dispatch(updateProduct({
      token,
      id: product.id,
      product: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        discount: product.discount,
        categoryId: category ? category.id : null,
        imageUrls: product.imageUrls.filter((imageUrl) => imageUrl !== url),
      },
    })).then((result) => {
      if (result.error) {
        setImageError(result.error.message ? result.error.message : ERROR_GENERICO)
      }
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
