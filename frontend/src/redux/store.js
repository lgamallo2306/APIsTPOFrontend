import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'
import reviewsReducer from './reviewsSlice'
import sellerReducer from './sellerSlice'
import ordersReducer from './ordersSlice'
import adminReducer from './adminSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    categories: categoriesReducer,
    reviews: reviewsReducer,
    seller: sellerReducer,
    orders: ordersReducer,
    admin: adminReducer,
  },
  devTools: import.meta.env.DEV,
})

export default store