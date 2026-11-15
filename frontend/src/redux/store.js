import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'
import reviewsReducer from './reviewsSlice'
import sellerReducer from './sellerSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    categories: categoriesReducer,
    reviews: reviewsReducer,
    seller: sellerReducer,
  },
  devTools: import.meta.env.DEV,
})

export default store