import { useState, useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import { getMe, getCart, getCategories } from './utils/api'

import CatalogView from './views/CatalogView'
import ProductDetailView from './views/ProductDetailView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import CartView from './views/CartView'
import MyPurchasesView from './views/MyPurchasesView'
import ProfileView from './views/ProfileView'
import MyProductsView from './views/MyProductsView'
import ProductFormView from './views/ProductFormView'
import PriceCalculatorView from './views/PriceCalculatorView'
import MySalesView from './views/MySalesView'
import CategoriesView from './views/admin/CategoriesView'
import UsersView from './views/admin/UsersView'


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [categories, setCategories] = useState([])

   const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setCartCount(0)
  }

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.content))
      .catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    if (!token) return
    getMe(token)
      .then((data) => setUser(data))
      .catch(() => handleLogout())
    getCart(token)
      .then((cart) => setCartCount(cart.items.reduce((total, item) => total + item.quantity, 0)))
      .catch(() => setCartCount(0))
  }, [token])

  const isVendor = user && (user.roles.includes('VENDOR') || user.roles.includes('ADMIN'))
  const isAdmin = user && user.roles.includes('ADMIN')

  return (
    <div className='app'>
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<CatalogView categories={categories} />} />
        <Route path="/productos/:id" element={<ProductDetailView />} />
        <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
        <Route path="/registro" element={<RegisterView onLogin={handleLogin} />} />

        <Route path="/carrito" element={user ? <CartView /> : <LoginView onLogin={handleLogin} />} />
        <Route path="/mis-compras" element={user ? <MyPurchasesView /> : <LoginView onLogin={handleLogin} />} />
        <Route path="/perfil" element={user ? <ProfileView user={user} /> : <LoginView onLogin={handleLogin} />} />

        <Route path="/vendedor/productos" element={isVendor ? <MyProductsView /> : <CatalogView categories={categories} />} />
        <Route path="/vendedor/productos/nuevo" element={isVendor ? <ProductFormView /> : <CatalogView categories={categories} />} />
        <Route path="/vendedor/productos/:id" element={isVendor ? <ProductFormView /> : <CatalogView categories={categories} />} />
        <Route path="/vendedor/calculadora" element={isVendor ? <PriceCalculatorView /> : <CatalogView categories={categories} />} />
        <Route path="/vendedor/ventas" element={isVendor ? <MySalesView /> : <CatalogView categories={categories} />} />

        <Route path="/admin/categorias" element={isAdmin ? <CategoriesView /> : <CatalogView categories={categories} />} />
        <Route path="/admin/usuarios" element={isAdmin ? <UsersView /> : <CatalogView categories={categories} />} />
      </Routes>
    </div>
  )
}

export default App