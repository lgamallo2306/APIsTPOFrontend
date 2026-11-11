import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'

export const fetchCart = createAsyncThunk('cart/fetchCart', async (token) => {
  const { data } = await axios.get(`${URL}/cart`, authConfig(token))
  return data
})


export const addCartItem = createAsyncThunk('cart/addCartItem', async ({ token, item }) => {
  const { data } = await axios.post(`${URL}/cart/items`, item, authConfig(token))
  return data
})

// quantity 0 elimina el ítem
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ token, item }) => {
  const { data } = await axios.put(`${URL}/cart/items`, item, authConfig(token))
  return data
})

export const clearCart = createAsyncThunk('cart/clearCart', async (token) => {
  await axios.delete(`${URL}/cart`, authConfig(token))
})

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.cart = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.cart = action.payload
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
     
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.cart = action.payload
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cart.items = []
        state.cart.total = 0
      })
  },
})

export const { resetCart } = cartSlice.actions
export default cartSlice.reducer