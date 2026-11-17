import './NewProductImages.css'

// Paso 2 del alta: elige las imágenes, que se suben recién al publicar. La primera es la portada
function NewProductImages({ files, publishing, error, onChange, onBack, onPublish }) {
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) onChange([...files, file])
  }

  const handleRemove = (index) => {
    onChange(files.filter((item, i) => i !== index))
  }

  return (
    <>
      <section className="card product-images">
        <div className="kv">
          <h2 className="h3">Imágenes</h2>
          <span className="small muted">{files.length} {files.length === 1 ? 'imagen' : 'imágenes'}</span>
        </div>
        <div className="field">
          <label className="label" htmlFor="new-product-image">Agregar imagen</label>
          <input id="new-product-image" className="input product-images-input" type="file" accept="image/jpeg,image/png,image/webp" disabled={publishing} onChange={handleFile} />
          <span className="help">JPG, PNG o WEBP · de a una. Se suben al publicar; la primera es la portada.</span>
        </div>
        {files.length > 0 && (
          <ul className="new-product-images-list">
            {files.map((file, index) => (
              <li key={index} className="new-product-images-item">
                <span className="new-product-images-name">
                  {index === 0 && <span className="badge b-nostock">Portada</span>}
                  {file.name}
                </span>
                <button type="button" className="btn btn-ghost btn-sm" disabled={publishing} onClick={() => handleRemove(index)}>Quitar</button>
              </li>
            ))}
          </ul>
        )}
        {error && <p className="alert-err">{error}</p>}
      </section>
      <div className="product-editor-actions">
        <button type="button" className="btn btn-ghost" disabled={publishing} onClick={onBack}>Atrás</button>
        <button type="button" className="btn btn-primary" disabled={publishing} onClick={onPublish}>
          {publishing ? 'Publicando…' : 'Publicar producto'}
        </button>
      </div>
    </>
  )
}

export default NewProductImages
