import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSellerProducts } from '../../redux/productSlice'
import BackButton from '../layout/BackButton'
import Reviews from '../reviews/Reviews'
import SellerProducts from './SellerProducts'
import './SellerProfile.css'

function SellerProfile() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const sellerProducts = useSelector((state) => state.products.sellerProducts)
  const params = new URLSearchParams(location.search)
  const page = params.get('page') || '0'
  const query = `sellerId=${id}&page=${page}`

  useEffect(() => {
    if (sellerProducts.query !== query) dispatch(fetchSellerProducts(query))
  }, [dispatch, query, sellerProducts.query])

  const handleRetry = () => {
    dispatch(fetchSellerProducts(query))
  }

  const loading = sellerProducts.query !== query || sellerProducts.loading
  const products = sellerProducts.page
  const name = !loading && products && products.content.length > 0 ? products.content[0].sellerName : 'Vendedor'

  return (
    <section className="seller-profile">
      <BackButton />
      <h1 className="h1">{name}</h1>
      <SellerProducts loading={loading} error={sellerProducts.error} products={products}
        onRetry={handleRetry} onPageChange={(number) => navigate(`/vendedores/${id}?page=${number}`)} />
      <Reviews title={`Opiniones sobre ${name}`} type="seller" id={Number(id)} />
    </section>
  )
}

export default SellerProfile
