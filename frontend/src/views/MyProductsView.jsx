import SellerLayout from '../components/seller/SellerLayout'
import MyProducts from '../components/seller/MyProducts'

function MyProductsView({ token, onLogout }) {
  return (
    <SellerLayout title="Mis productos">
      <MyProducts token={token} onLogout={onLogout} />
    </SellerLayout>
  )
}

export default MyProductsView
