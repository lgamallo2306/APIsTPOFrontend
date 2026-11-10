import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    categories: categoriesReducer,
  },
})

export default store