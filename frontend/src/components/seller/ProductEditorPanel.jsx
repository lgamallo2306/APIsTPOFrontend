import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct, uploadProductImage } from '../../redux/sellerSlice'
import { toast } from 'react-toastify'
import ProductDataForm from './ProductDataForm'
import ProductSteps from './ProductSteps'
import ProductImagesStep from './ProductImagesStep'


const ERROR_GENERICO = 'No pudimos completar la operación. Intentá de nuevo en unos segundos.'


// Edición de un producto que ya existe: los dos pasos se pueden elegir y cada cambio se guarda en el momento
function ProductEditorPanel({ product, initialStep }) {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const categories = useSelector((state) => state.categories.items)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [imageError, setImageError] = useState('')
  const [step, setStep] = useState(initialStep)


  const handleSave = (data) => {
    setSaving(true)
    setSaveError('')
    dispatch(updateProduct({ token, id: product.id, product: data })).then((result) => {
      setSaving(false)
      if (result.error) {
        setSaveError(result.error.message ? result.error.message : ERROR_GENERICO)
        return
      }
      toast.success('Cambios guardados')
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
      <ProductSteps step={step} canChoose={true} onChange={setStep} />
      {step === 1 && (
        <ProductDataForm
          product={product}
          categories={categories}
          suggestedPrice={null}
          saving={saving}
          error={saveError}
          onSave={handleSave}
        />
      )}
      {step === 2 && (
        <ProductImagesStep
          product={product}
          uploading={uploading}
          error={imageError}
          onUpload={handleUpload}
          onRemove={handleRemoveImage}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  )
}

export default ProductEditorPanel
