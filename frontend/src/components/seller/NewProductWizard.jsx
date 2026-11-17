import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { publishProduct } from '../../redux/sellerSlice'
import ProductSteps from './ProductSteps'
import ProductDataForm from './ProductDataForm'
import NewProductImages from './NewProductImages'

const ERROR_GENERICO = 'No pudimos publicar el producto. Intentá de nuevo en unos segundos.'

// Alta en dos pasos. Hasta "Publicar" no se manda nada al back: datos e imágenes quedan en el estado local
function NewProductWizard({ suggestedPrice }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const categories = useSelector((state) => state.categories.items)
  const [step, setStep] = useState(1)
  const [draft, setDraft] = useState(null)
  const [files, setFiles] = useState([])
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')

  // el formulario ya validó los datos: se guardan y se pasa a las imágenes
  const handleNext = (data) => {
    setDraft(data)
    setStep(2)
  }

  const handlePublish = () => {
    setPublishing(true)
    setPublishError('')
    dispatch(publishProduct({ token, product: draft, files })).then((result) => {
      setPublishing(false)
      if (result.error) {
        setPublishError(result.error.message ? result.error.message : ERROR_GENERICO)
        return
      }
      const saved = result.payload.product
      if (result.payload.imageError) {
        // el producto ya existe: se reintentan las imágenes desde la edición, sin crearlo de nuevo
        toast.warning('El producto se publicó, pero no se pudo subir una imagen. Probá de nuevo desde acá.')
        navigate(`/vendedor/productos/${saved.id}`, { replace: true, state: { step: 2 } })
        return
      }
      toast.success('Producto publicado')
      navigate('/vendedor/productos', { replace: true })
    })
  }

  return (
    <div className="product-editor">
      <ProductSteps step={step} canChoose={false} onChange={setStep} />
      {/* el formulario queda montado (oculto) en el paso 2, así no se pierden los datos al volver */}
      <div hidden={step !== 1}>
        <ProductDataForm product={null} categories={categories} suggestedPrice={suggestedPrice} saving={false} error="" onSave={handleNext} />
      </div>
      {step === 2 && (
        <NewProductImages
          files={files}
          publishing={publishing}
          error={publishError}
          onChange={setFiles}
          onBack={() => setStep(1)}
          onPublish={handlePublish}
        />
      )}
    </div>
  )
}

export default NewProductWizard
