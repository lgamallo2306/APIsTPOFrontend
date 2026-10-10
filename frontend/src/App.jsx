import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
/*
import CatalogView from './views/CatalogView';
import LoginView from './views/LoginView';
import ProductDetailView from './views/ProductDetailView';
import MyProductsView from './views/MyProductsView';
import ProductFormView from './views/NewProductFormView';
import PriceCalculatorView from './views/PriceCalculatorView';
import MySalesView from './views/MySalesView';
import CategoriesView from './views/admin/CategoriesView';
import UsersView from './views/admin/UsersView';
*/
import ProductGrid from './components/products/ProductGrid'
import ProductCard from './components/products/ProductCard'
import Header from './components/layout/Header'
import CatalogView from './views/CatalogView'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate
  const handleClick =()=>{
    navigate('/Categories')
    
  }

  return(
   <>
    <Header />
    <Routes>
      <Route path='/CatalogView' element ={<CatalogView />}/>
    </Routes>
    <button onClick={handleClick}>Categorias</button>
    {/*
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/producto/:id" element={<ProductDetailView />} />

        <Route element={<ProtectedRoute allowedRoles={['VENDOR', 'ADMIN']} />}>
          <Route path="/vendedor/mis-productos" element={<MyProductsView />} />
          <Route path="/vendedor/nuevo-producto" element={<ProductFormView />} />
          <Route path="/vendedor/calculadora" element={<PriceCalculatorView />} />
          <Route path="/vendedor/mis-ventas" element={<MySalesView />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route path="/admin/categorias" element={<CategoriesView />} />
          <Route path="/admin/usuarios" element={<UsersView />} />
        </Route>
      </Routes>
    </BrowserRouter>
    */}
    </>
    
  )
}

export default App
