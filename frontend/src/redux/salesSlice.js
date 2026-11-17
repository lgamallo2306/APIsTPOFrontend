import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'
import { logout } from './authSlice'

export const getSales = createAsyncThunk('sales/getSales', async (token) => {
  const { data } = await axios.get(`${URL}/orders/sales`, authConfig(token))
  return data
})

export const getMaterials = createAsyncThunk('sales/getMaterials', async () => {
  const { data } = await axios.get(`${URL}/products/materials`)
  return data
})

export const estimatePrice = createAsyncThunk('sales/estimatePrice', async ({ token, estimate }) => {
  const { data } = await axios.post(`${URL}/products/estimate-price`, estimate, authConfig(token))
  return data
})

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    sales: { token: null, items: [], loading: false, error: null },
    materials: { items: [], loading: false, error: null },
    estimate: { result: null, loading: false, error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.sales = { token: null, items: [], loading: false, error: null }
        state.estimate = { result: null, loading: false, error: null }
      })

      .addCase(getSales.pending, (state, action) => {
        state.sales = { token: action.meta.arg, items: [], loading: true, error: null }
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.sales.loading = false
        state.sales.items = action.payload
      })
      .addCase(getSales.rejected, (state, action) => {
        state.sales.loading = false
        state.sales.error = action.error.message
      })

      .addCase(getMaterials.pending, (state) => {
        state.materials.loading = true
        state.materials.error = null
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.materials.loading = false
        state.materials.items = action.payload
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.materials.loading = false
        state.materials.error = action.error.message
      })

      .addCase(estimatePrice.pending, (state) => {
        state.estimate.loading = true
        state.estimate.error = null
      })
      .addCase(estimatePrice.fulfilled, (state, action) => {
        state.estimate.loading = false
        state.estimate.result = action.payload
      })
      .addCase(estimatePrice.rejected, (state, action) => {
        state.estimate.loading = false
        state.estimate.error = action.error.message
      })
  },
})

export default salesSlice.reducer
