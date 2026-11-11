import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from './apiconfig'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (query) => {
  const { data } = await axios.get(`${URL}/products?size=12&${query}`)
  return data
})


export const fetchProductRow = createAsyncThunk('products/fetchProductRow', async (query) => {
  const { data } = await axios.get(`${URL}/products?size=5&${query}`)
  return data.content
})


export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
  const { data } = await axios.get(`${URL}/products/${id}`)
  return data
})

const productSlice = createSlice({
  name: 'products',
  initialState: {
  catalog: { query: null, page: null, loading: false, error: null },
  rows: {},
  detail: { id: null, product: null, loading: false, error: null },
},
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      // catálogo
      .addCase(fetchProducts.pending, (state, action) => {
        state.catalog = {query: action.meta.arg, page: null, loading: true, error: null }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.catalog.loading = false
        state.catalog.page = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.catalog.loading = false
        state.catalog.error = action.error.message
      })

      // filas de Home
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
      .addCase(fetchProduct.pending, (state, action) => {
        state.detail = {id: action.meta.arg, product: null, loading: true, error: null}
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.detail.loading = false
        state.detail.product = action.payload
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.detail.loading = false
        state.detail.error = action.error.message
      })
  },
})

export default productSlice.reducer
