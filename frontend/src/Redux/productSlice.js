import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from './apiConfig'

// catálogo: query = filtros de la URL (name, categoryId, page...)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (query) => {
  const { data } = await axios.get(`${URL}/products?size=12&${query}`)
  return data
})

// filas de la Home: cada fila se guarda con su query como clave
export const fetchProductRow = createAsyncThunk('products/fetchProductRow', async (query) => {
  const { data } = await axios.get(`${URL}/products?size=5&${query}`)
  return data.content
})

// detalle de un producto
export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
  const { data } = await axios.get(`${URL}/products/${id}`)
  return data
})

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    totalPages: 0,
    loading: false,
    error: null,
    rows: {},
    selectedProduct: null,
    selectedLoading: false,
    selectedError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // catálogo
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.content
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // filas de la Home
      .addCase(fetchProductRow.pending, (state, action) => {
        state.rows[action.meta.arg] = { items: [], loading: true, error: null }
      })
      .addCase(fetchProductRow.fulfilled, (state, action) => {
        state.rows[action.meta.arg] = { items: action.payload, loading: false, error: null }
      })
      .addCase(fetchProductRow.rejected, (state, action) => {
        state.rows[action.meta.arg] = { items: [], loading: false, error: action.error.message }
      })
      // detalle
      .addCase(fetchProduct.pending, (state) => {
        state.selectedLoading = true
        state.selectedError = null
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.selectedLoading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.selectedLoading = false
        state.selectedError = action.error.message
      })
  },
})

export default productSlice.reducer
