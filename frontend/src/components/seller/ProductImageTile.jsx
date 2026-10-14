function ProductImageTile({ url, name, isCover, onRemove }) {
  return (
    <div className="product-image-tile">
      <div className="pimg product-image-tile-img">
        <img src={url} alt={name} />
      </div>
      {isCover && <span className="badge b-nostock product-image-tile-cover">Portada</span>}
      <button type="button" className="btn btn-secondary btn-sm product-image-tile-remove" onClick={() => onRemove(url)}>
        Quitar
      </button>
    </div>
  )
}

export default ProductImageTile
