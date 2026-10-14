import PriceTag from '../products/PriceTag'

// Precio, stock y descuento, con el precio final calculado en vivo debajo
function ProductPriceFields({ form, onChange }) {
  const price = Number(form.price)
  const discount = Number(form.discount)
  const showPreview = form.price !== '' && price > 0 && discount >= 0 && discount <= 100

  return (
    <>
      <div className="product-data-form-row">
        <div className="field">
          <label className="label" htmlFor="product-price">Precio de lista</label>
          <div className="affix">
            <span className="pre">$</span>
            <input id="product-price" className="input product-data-form-price" type="number" min="0" step="0.01" name="price" value={form.price} onChange={onChange} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="product-stock">Stock</label>
          <input id="product-stock" className="input" type="number" min="0" step="1" name="stock" value={form.stock} onChange={onChange} />
        </div>
        <div className="field">
          <label className="label" htmlFor="product-discount">Descuento</label>
          <div className="affix">
            <input id="product-discount" className="input" type="number" min="0" max="100" name="discount" value={form.discount} onChange={onChange} />
            <span className="suf">%</span>
          </div>
          <span className="help">De 0 a 100</span>
        </div>
      </div>
      <div className="note product-data-form-preview">
        <span>Precio final para el comprador</span>
        {showPreview && <PriceTag price={price} discount={discount} />}
      </div>
    </>
  )
}

export default ProductPriceFields
