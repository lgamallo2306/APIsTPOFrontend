import SellerLayout from '../components/seller/SellerLayout'
import MySales from '../components/seller/MySales'

function MySalesView({ token }) {
  return (
    <SellerLayout title="Mis ventas">
      <MySales token={token} />
    </SellerLayout>
  )
}

export default MySalesView
