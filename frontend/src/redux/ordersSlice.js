import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'
import { logout } from './authSlice'
import { checkout } from './cartSlice'

// historial de compras del usuario logueado
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (token) => {
  const { data } = await axios.get(`${URL}/orders`, authConfig(token))
  return data
})

// una orden por id
export const fetchOrder = createAsyncThunk('orders/fetchOrder', async ({ token, id }) => {
  const { data } = await axios.get(`${URL}/orders/${id}`, authConfig(token))
  return data
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: { items: [], loaded: false, loading: false, error: null },
    detail: { id: null, order: null, loading: false, error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.list = { items: [], loaded: false, loading: false, error: null }
        state.detail = { id: null, order: null, loading: false, error: null }
      })

      .addCase(checkout.fulfilled, (state, action) => {
        if (state.list.loaded) {
          state.list.items = [action.payload, ...state.list.items]
        }
      })

      // historial
      .addCase(fetchOrders.pending, (state) => {
        state.list.loading = true
        state.list.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = { items: action.payload, loaded: true, loading: false, error: null }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.list.loading = false
        state.list.error = action.error.message
      })

      // detalle: se guarda qué id se pidió, para no repetir el GET
      .addCase(fetchOrder.pending, (state, action) => {
        state.detail = { id: action.meta.arg.id, order: null, loading: true, error: null }
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.detail.order = action.payload
        state.detail.loading = false
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.detail.loading = false
        state.detail.error = action.error.message
      })
  },
})

export default ordersSlice.reducer
