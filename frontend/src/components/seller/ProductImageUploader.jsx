import ProductImageTile from './ProductImageTile'
import './ProductImageUploader.css'


function ProductImageUploader({ product, uploading, error, onUpload, onRemove }) {
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) onUpload(file)
  }

  return (
    <section className="card product-images">
      <div className="kv">
        <h2 className="h3">Imágenes</h2>
        <span className="small muted">{product.imageUrls.length} {product.imageUrls.length === 1 ? 'imagen' : 'imágenes'}</span>
      </div>
      <div className="field">
        <label className="label" htmlFor="product-image-file">Agregar imagen</label>
        <input id="product-image-file" className="input product-images-input" type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={handleFile} />
        <span className="help">{uploading ? 'Subiendo…' : 'JPG, PNG o WEBP · de a una'}</span>
      </div>
      {error && <p className="alert-err">{error}</p>}
      <div className="product-images-grid">
        {product.imageUrls.map((url, index) => (
          <ProductImageTile key={url} url={url} name={product.name} isCover={index === 0} onRemove={onRemove} />
        ))}
        {uploading && <div className="skel product-images-uploading" />}
      </div>
    </section>
  )
}

export default ProductImageUploader
