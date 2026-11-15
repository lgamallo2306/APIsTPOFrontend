import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyProducts } from '../../redux/sellerSlice'
import MyProductsPanel from './MyProductsPanel'
import './MyProducts.css'



function MyProducts({ token }) {
  const dispatch = useDispatch()
  const sellerPage = useSelector((state) => state.seller.page)
  const [page, setPage] = useState(0)
  

 useEffect(() => {
  if (sellerPage.number !== page) {
    dispatch(fetchMyProducts({ token, page }))
  } else if (sellerPage.data && sellerPage.data.content.length === 0 && page > 0) {
    setPage(page - 1)
  }
}, [dispatch, token, page, sellerPage.number, sellerPage.data])

  const handleRetry = () => {
    dispatch(fetchMyProducts({token, page}))
  }

    const loading = sellerPage.number !== page || sellerPage.loading
    const data = sellerPage.data
    const error = sellerPage.error

  return (
    <MyProductsPanel
      token={token}
      loading={loading}
      error={error}
      data={data}
      onRetry={handleRetry}
      onPageChange={(number) => setPage(number)}
    />
  )
}

export default MyProducts
