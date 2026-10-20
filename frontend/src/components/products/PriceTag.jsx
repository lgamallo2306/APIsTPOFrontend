import { formatPrice, finalPrice } from '../../utils/format'
import './PriceTag.css'

function PriceTag({ price, discount, large }) {
  return (
    <div className="price-tag">
      {discount > 0 && <span className="strike small">{formatPrice(price)}</span>}
      <div className="price-tag-row">
        <span className={large ? 'price price-tag-final price-tag-large' : 'price price-tag-final'}>{formatPrice(finalPrice(price, discount))}</span>
        {discount > 0 && <span className="badge b-off">-{discount}%</span>}
      </div>
    </div>
  )
}

export default PriceTag
