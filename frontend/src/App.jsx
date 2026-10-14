import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import { getMe, getCart, getCartProducts, getCategories } from './utils/api'
import { countUnits } from './utils/format'
import PageLoading from './components/ui/PageLoading'

import CatalogView from './views/CatalogView'
import ProductDetailView from './views/ProductDetailView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import CartView from './views/CartView'
import MyPurchasesView from './views/MyPurchasesView'
import OrderDetailView from './views/OrderDetailView'
import ProfileView from './views/ProfileView'
import MyProductsView from './views/MyProductsView'
import ProductFormView from './views/ProductFormView'
import PriceCalculatorView from './views/PriceCalculatorView'
import MySalesView from './views/MySalesView'
import CategoriesView from './views/admin/CategoriesView'
import UsersView from './views/admin/UsersView'
import OrderConfirmationView from './views/OrderConfirmationView'


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)
  // con token guardado, el usuario tarda en llegar: mientras tanto no se muestra el login
  const [loadingUser, setLoadingUser] = useState(localStorage.getItem('token') !== null)
  const [cart, setCart] = useState(null)
  const [cartError, setCartError] = useState('')
  const [cartProducts, setCartProducts] = useState([])
  const [categories, setCategories] = useState([])

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken)
    setLoadingUser(true)
    setToken(newToken)
  }

  // el panel admin pide su propia página; App mantiene la lista del catálogo al día con cada cambio
  const handleCategorySaved = (saved) => {
    setCategories((prev) => (prev.some((item) => item.id === saved.id)
      ? prev.map((item) => (item.id === saved.id ? saved : item))
      : [...prev, saved]))
  }

  const handleCategoryDeleted = (id) => {
    setCategories((prev) => prev.filter((item) => item.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setLoadingUser(false)
    setCart(null)
    setCartError('')
    setCartProducts([])
  }

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.content))
      .catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    if (!token) return
    getMe(token)
      .then((data) => {
        setUser(data)
        setLoadingUser(false)
      })
      .catch(() => handleLogout())
    getCart(token)
      .then((data) => {
        setCart(data)
        getCartProducts(data.items)
          .then((products) => setCartProducts(products))
          .catch(() => setCartProducts([]))
      })
      .catch((error) => setCartError(error.message))
  }, [token])

  const handleRetryCart = () => {
    setCartError('')
    getCart(token)
      .then((data) => {
        setCart(data)
        getCartProducts(data.items)
          .then((products) => setCartProducts(products))
          .catch(() => setCartProducts([]))
      })
      .catch((error) => setCartError(error.message))
  }

  // product llega cuando se agrega desde el detalle: se guarda para tener su imagen sin otro GET
  const handleCartChange = (newCart, product) => {
    setCart(newCart)
    if (product && !cartProducts.some((saved) => saved.id === product.id)) {
      setCartProducts([...cartProducts, product])
    }
  }

  const cartCount = cart ? countUnits(cart.items) : 0

  // lo que se muestra en una ruta protegida cuando no hay permiso (o todavía no llegó el usuario)
  const loginOrLoading = loadingUser ? <PageLoading /> : <LoginView onLogin={handleLogin} />
  const catalogOrLoading = loadingUser ? <PageLoading /> : <CatalogView categories={categories} />

  const isVendor = user && (user.roles.includes('VENDOR') || user.roles.includes('ADMIN'))
  const isAdmin = user && user.roles.includes('ADMIN')

  return (
    <div className='app'>
      <Header user={user} cartCount={cartCount} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<CatalogView categories={categories} />} />
        <Route path="/productos/:id" element={<ProductDetailView token={token} onCartChange={handleCartChange} onLogout={handleLogout} />} />
        <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
        <Route path="/registro" element={<RegisterView onLogin={handleLogin} />} />

        <Route path="/carrito" element={user ? <CartView cart={cart} products={cartProducts} error={cartError} onRetry={handleRetryCart} token={token} onCartChange={handleCartChange} onLogout={handleLogout} /> : loginOrLoading} />
        <Route path="/compra/:id/confirmada" element={user ? <OrderConfirmationView token={token} onLogout={handleLogout} /> : loginOrLoading} />
        <Route path="/mis-compras" element={user ? <MyPurchasesView token={token} onLogout={handleLogout} /> : loginOrLoading} />
        <Route path="/mis-compras/:id" element={user ? <OrderDetailView token={token} onLogout={handleLogout} /> : loginOrLoading} />
        <Route path="/perfil" element={user ? <ProfileView user={user} onLogout={handleLogout} /> : loginOrLoading} />

        <Route path="/vendedor/productos" element={isVendor ? <MyProductsView token={token} onLogout={handleLogout} /> : catalogOrLoading} />
        <Route path="/vendedor/productos/nuevo" element={isVendor ? <ProductFormView title="Nuevo producto" user={user} token={token} categories={categories} onLogout={handleLogout} /> : catalogOrLoading} />
        <Route path="/vendedor/productos/:id" element={isVendor ? <ProductFormView title="Editar producto" user={user} token={token} categories={categories} onLogout={handleLogout} /> : catalogOrLoading} />
        <Route path="/vendedor/calculadora" element={isVendor ? <PriceCalculatorView token={token} /> : catalogOrLoading} />
        <Route path="/vendedor/ventas" element={isVendor ? <MySalesView token={token} /> : catalogOrLoading} />

        <Route path="/admin/categorias" element={isAdmin ? <CategoriesView token={token} onCategorySaved={handleCategorySaved} onCategoryDeleted={handleCategoryDeleted} onLogout={handleLogout} /> : catalogOrLoading} />
        <Route path="/admin/usuarios" element={isAdmin ? <UsersView token={token} onLogout={handleLogout} /> : catalogOrLoading} />
      </Routes>
    </div>
  )
}

export default App