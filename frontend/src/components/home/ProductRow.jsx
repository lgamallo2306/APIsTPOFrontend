import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProductRow } from '../../utils/api'
import ProductCard from '../products/ProductCard'
import './ProductRow.css'

const SKELETONS = [1, 2, 3, 4, 5]


function ProductRow({ title, subtitle, query, moreLink }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductRow(query)
      .then((data) => {
        setProducts(data.content)
        setLoading(false)
      })
      .catch(() => {
        setProducts([])
        setLoading(false)
      })
  }, [query])

  if (!loading && products.length === 0) return null

  return (
    <section className="product-row">
      <div className="product-row-head">
        <h2 className="h2">{title}</h2>
        <Link to={moreLink} className="small product-row-more">Ver más →</Link>
        <span className="small muted product-row-subtitle">{subtitle}</span>
      </div>
      <div className="product-row-list">
        {loading
          ? SKELETONS.map((item) => <div key={item} className="skel product-row-skeleton" />)
          : products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  )
}

export default ProductRow