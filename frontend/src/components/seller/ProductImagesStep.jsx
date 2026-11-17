import { Link } from 'react-router-dom'
import ProductImageUploader from './ProductImageUploader'


function ProductImagesStep({ product, uploading, error, onUpload, onRemove, onBack }) {
  return (
    <>
      <ProductImageUploader product={product} uploading={uploading} error={error} onUpload={onUpload} onRemove={onRemove} />
      <div className="product-editor-actions">
        <button type="button" className="btn btn-ghost" onClick={onBack}>Volver a los datos</button>
        <Link to="/vendedor/productos" className="btn btn-primary">Terminar</Link>
      </div>
    </>
  )
}

export default ProductImagesStep