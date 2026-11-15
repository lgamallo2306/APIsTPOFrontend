import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'

export const fetchMyProducts = createAsyncThunk('seller/fetchMyProducts', async ({token, page}) => {
    const {data} = await axios.get(`${URL}/products/mine?page=${page}`, authConfig(token))
    return data
})

export const updateStock = createAsyncThunk('seller/updateStock', async ({ token, id, quantity }) => {
  const { data } = await axios.patch(`${URL}/products/${id}/stock`, { quantity }, authConfig(token))
  return data
})


export const updateDiscount = createAsyncThunk('seller/updateDiscount', async ({ token, id, discount }) => {
  const { data } = await axios.patch(`${URL}/products/${id}/discount`, { discount }, authConfig(token))
  return data
})

export const deleteProduct = createAsyncThunk('seller/deleteProduct', async ({ token, id }) => {
  await axios.delete(`${URL}/products/${id}`, authConfig(token))
})

const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        // number = página pedida; data = la página que devuelve el back 
        page: {number: null, data: null, loading: false, error: null},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProducts.pending, (state, action) => {
                state.page = {number: action.meta.arg.page, data: null, loading: true, error: null}
            })
            .addCase(fetchMyProducts.fulfilled, (state, action) => {
                state.page.data = action.payload
                state.page.loading = false
            })
            .addCase(fetchMyProducts.rejected, (state, action) => {
                state.page.loading = false
                state.page.error = action.error.message
            })
            .addCase(updateDiscount.fulfilled, (state, action) => {
                const index = state.page.data.content.findIndex((item) => item.id === action.payload.id)
                if(index !== -1){
                    state.page.data.content[index] = action.payload
                }
            })
            .addCase(updateStock.fulfilled, (state, action) => {
            const index = state.page.data.content.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) {
            state.page.data.content[index] = action.payload
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.meta.arg.id
        state.page.data.content = state.page.data.content.filter((item) => item.id !== id)
        state.page.data.totalElements = state.page.data.totalElements - 1
      })
    }
})

export default sellerSlice.reducer