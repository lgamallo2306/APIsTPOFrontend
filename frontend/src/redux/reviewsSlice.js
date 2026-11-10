import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'

export const getProductReviews = createAsyncThunk('reviews/getProductReviews', async (id) => {
  const { data } = await axios.get(`${URL}/reviews/products/${id}`)
  return data
})

export const getSellerReviews = createAsyncThunk('reviews/getSellerReviews', async (id) => {
  const { data } = await axios.get(`${URL}/reviews/sellers/${id}`)
  return data
})

// review = { rating, comment }
export const createProductReview = createAsyncThunk('reviews/createProductReview', async ({ token, id, review }) => {
  const { data } = await axios.post(`${URL}/reviews/products/${id}`, review, authConfig(token))
  return data
})

export const createSellerReview = createAsyncThunk('reviews/createSellerReview', async ({ token, id, review }) => {
  const { data } = await axios.post(`${URL}/reviews/sellers/${id}`, review, authConfig(token))
  return data
})

export const deleteReview = createAsyncThunk('reviews/deleteReview', async ({ token, id }) => {
  await axios.delete(`${URL}/reviews/${id}`, authConfig(token))
})

// product y seller guardan las reseñas del último producto / vendedor pedido (id = lo que se pidió)
const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    product: { id: null, items: [], loading: false, error: null },
    seller: { id: null, items: [], loading: false, error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // reseñas del producto
      .addCase(getProductReviews.pending, (state, action) => {
        state.product = { id: action.meta.arg, items: [], loading: true, error: null }
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.product.loading = false
        state.product.items = action.payload
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.product.loading = false
        state.product.error = action.error.message
      })

      // reseñas del vendedor
      .addCase(getSellerReviews.pending, (state, action) => {
        state.seller = { id: action.meta.arg, items: [], loading: true, error: null }
      })
      .addCase(getSellerReviews.fulfilled, (state, action) => {
        state.seller.loading = false
        state.seller.items = action.payload
      })
      .addCase(getSellerReviews.rejected, (state, action) => {
        state.seller.loading = false
        state.seller.error = action.error.message
      })

      // el back las ordena de la más nueva a la más vieja: la nueva va primera.
      // Solo se agrega si ya están cargadas las reseñas de ese producto / vendedor
      .addCase(createProductReview.fulfilled, (state, action) => {
        if (state.product.id === action.meta.arg.id) {
          state.product.items = [action.payload, ...state.product.items]
        }
      })
      .addCase(createSellerReview.fulfilled, (state, action) => {
        if (state.seller.id === action.meta.arg.id) {
          state.seller.items = [action.payload, ...state.seller.items]
        }
      })

      // la reseña puede estar en cualquiera de las dos listas: se filtran las dos
      .addCase(deleteReview.fulfilled, (state, action) => {
        const id = action.meta.arg.id
        state.product.items = state.product.items.filter((review) => review.id !== id)
        state.seller.items = state.seller.items.filter((review) => review.id !== id)
      })
  },
})

export default reviewsSlice.reducer
