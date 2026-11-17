import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
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
import NotFoundView from './views/NotFoundView'
import OrderConfirmationView from './views/OrderConfirmationView'
import HomeView from './views/HomeView'
import Footer from './components/layout/Footer'
import { ToastContainer, toast } from 'react-toastify'
import LoginRequired from './components/auth/LoginRequired'
import { fetchCategories } from './redux/categoriesSlice'
import { fetchCart } from './redux/cartSlice'
import { getMe, logout } from './redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'



function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const user = useSelector((state) => state.auth.user)
  const loadingUser = useSelector((state) => state.auth.loadingUser)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (!token) return
    dispatch(getMe(token)).then((result) => {
      if (result.error) {
        localStorage.removeItem('token')
        dispatch(logout())
        toast.error('Tu sesión venció. Ingresá de nuevo.')
      }
    })
    dispatch(fetchCart(token))
  }, [token, dispatch])

  const loginOrLoading = loadingUser ? <PageLoading /> : <LoginRequired />
  const catalogOrLoading = loadingUser ? <PageLoading /> : <CatalogView />

  const isVendor = user && (user.roles.includes('VENDOR') || user.roles.includes('ADMIN'))
  const isAdmin = user && user.roles.includes('ADMIN')

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/catalogo' element={<CatalogView />} />
        <Route path="/productos/:id" element={<ProductDetailView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/registro" element={<RegisterView />} />

        <Route path="/carrito" element={user ? <CartView /> : loginOrLoading} />
        <Route path="/compra/:id/confirmada" element={user ? <OrderConfirmationView /> : loginOrLoading} />
        <Route path="/mis-compras" element={user ? <MyPurchasesView /> : loginOrLoading} />
        <Route path="/mis-compras/:id" element={user ? <OrderDetailView /> : loginOrLoading} />
        <Route path="/perfil" element={user ? <ProfileView /> : loginOrLoading} />

        <Route path="/vendedor/productos" element={isVendor ? <MyProductsView /> : catalogOrLoading} />
        <Route path="/vendedor/productos/nuevo" element={isVendor ? <ProductFormView title="Nuevo producto" /> : catalogOrLoading} />
        <Route path="/vendedor/productos/:id" element={isVendor ? <ProductFormView title="Editar producto" /> : catalogOrLoading} />
        <Route path="/vendedor/calculadora" element={isVendor ? <PriceCalculatorView /> : catalogOrLoading} />
        <Route path="/vendedor/ventas" element={isVendor ? <MySalesView /> : catalogOrLoading} />

        <Route path="/admin/categorias" element={isAdmin ? <CategoriesView /> : catalogOrLoading} />
        <Route path="/admin/usuarios" element={isAdmin ? <UsersView /> : catalogOrLoading} />

        <Route path="*" element={<NotFoundView />} />
        
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}

export default App