import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL } from './apiconfig'
import { createProduct, updateProduct, uploadProductImage, updateStock, updateDiscount, deleteProduct } from './sellerSlice'

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

      .addCase(createProduct.fulfilled, (state, action) => {
        state.detail = { id: String(action.payload.id), product: action.payload, loading: false, error: null }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (state.detail.id === String(action.payload.id)) {
          state.detail.product = action.payload
        }
      })
      .addCase(uploadProductImage.fulfilled, (state, action) => {
        if (state.detail.id === String(action.payload.id)) {
          state.detail.product = action.payload
        }
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        if (state.detail.id === String(action.payload.id)) {
          state.detail.product = action.payload
        }
      })
      .addCase(updateDiscount.fulfilled, (state, action) => {
        if (state.detail.id === String(action.payload.id)) {
          state.detail.product = action.payload
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (state.detail.id === String(action.meta.arg.id)) {
          state.detail = { id: null, product: null, loading: false, error: null }
        }
      })
  },
})

export default productSlice.reducer
