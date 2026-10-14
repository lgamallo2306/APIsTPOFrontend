import SellerLayout from '../components/seller/SellerLayout'
import MyProducts from '../components/seller/MyProducts'

function MyProductsView({ token }) {
  return (
    <SellerLayout title="Mis productos">
      <MyProducts token={token} />
    </SellerLayout>
  )
}

export default MyProductsView
