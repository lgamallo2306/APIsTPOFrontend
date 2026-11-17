import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'
import { logout } from './authSlice'

export const fetchMyProducts = createAsyncThunk('seller/fetchMyProducts', async ({token, page}) => {
    const {data} = await axios.get(`${URL}/products/mine?page=${page}`, authConfig(token))
    return data
})

export const createProduct = createAsyncThunk('seller/createProduct', async ({ token, product }) => {
  const { data } = await axios.post(`${URL}/products`, product, authConfig(token))
  return data
})

export const updateProduct = createAsyncThunk('seller/updateProduct', async ({ token, id, product }) => {
  const { data } = await axios.put(`${URL}/products/${id}`, product, authConfig(token))
  return data
})

export const uploadProductImage = createAsyncThunk('seller/uploadProductImage', async ({ token, id, file }) => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await axios.post(`${URL}/products/${id}/images`, formData, authConfig(token))
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

const initialState = {
    // number = página pedida; data = la página que devuelve el back 
    page: {number: null, data: null, loading: false, error: null},
}

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logout, () => initialState)

            .addCase(createProduct.fulfilled, (state, action) => {
                if (state.page.data) {
                    state.page.data.content = [...state.page.data.content, action.payload]
                    state.page.data.totalElements = state.page.data.totalElements + 1
                }
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                if (state.page.data) {
                    const index = state.page.data.content.findIndex((item) => item.id === action.payload.id)
                    if (index !== -1) {
                        state.page.data.content[index] = action.payload
                    }
                }
            })
            .addCase(uploadProductImage.fulfilled, (state, action) => {
                if (state.page.data) {
                    const index = state.page.data.content.findIndex((item) => item.id === action.payload.id)
                    if (index !== -1) {
                        state.page.data.content[index] = action.payload
                    }
                }
            })
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