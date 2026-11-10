import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../products/ProductCard'
import './ProductRow.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductRow } from '../../Redux/productSlice'

const SKELETONS = [1, 2, 3, 4, 5]


function ProductRow({ title, subtitle, query, moreLink }) {
  const dispatch = useDispatch()
  const row = useSelector((state) => state.products.rows[query])


  useEffect(() => {
   if(!row) dispatch(fetchProductRow(query)) 
  }, [dispatch, query, row])

  const loading = !row || row.loading
  const products = row ? row.items : []

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