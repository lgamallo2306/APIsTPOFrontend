import SellerNav from './SellerNav'
import './SellerLayout.css'

function SellerLayout({ title, children }) {
  return (
    <div className="seller-layout">
      <SellerNav />
      <main className="seller-layout-main">
        <div className="seller-layout-title">
          <span className="eyebrow">Panel vendedor</span>
          <h1 className="h1">{title}</h1>
        </div>
        {children}
      </main>
    </div>
  )
}

export default SellerLayout
