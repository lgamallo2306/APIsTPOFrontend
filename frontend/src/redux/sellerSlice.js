import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'
import { logout } from './authSlice'

export const fetchMyProducts = createAsyncThunk('seller/fetchMyProducts', async ({token, page}) => {
    const {data} = await axios.get(`${URL}/products/mine?page=${page}`, authConfig(token))
    return data
})

export const publishProduct = createAsyncThunk('seller/publishProduct', async ({ token, product, files }) => {
  const { data } = await axios.post(`${URL}/products`, product, authConfig(token))
  let saved = data
  
  for (let i = 0; i < files.length; i++) {
    const formData = new FormData()
    formData.append('file', files[i])
    try {
      const response = await axios.post(`${URL}/products/${saved.id}/images`, formData, authConfig(token))
      saved = response.data
    } catch (error) {
      return { product: saved, imageError: error.message }
    }
  }
  return { product: saved, imageError: null }
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


export const fetchEditorProduct = createAsyncThunk('seller/fetchEditorProduct', async (id) => {
  const { data } = await axios.get(`${URL}/products/${id}`)
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
    
        page: {number: null, data: null, loading: false, error: null},
        editor: { id: null, product: null, loading: false, error: null },
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logout, (state) => {
                state.page = {number: null, data: null, loading: false, error: null}
                state.editor = { id: null, product: null, loading: false, error: null }
            })

            .addCase(publishProduct.fulfilled, (state, action) => {
                const product = action.payload.product
                state.editor = { id: String(product.id), product: product, loading: false, error: null }
                state.page = { number: null, data: null, loading: false, error: null }
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.editor.product = action.payload
                if (state.page.data) {
                    const index = state.page.data.content.findIndex((item) => item.id === action.payload.id)
                    if (index !== -1) {
                        state.page.data.content[index] = action.payload
                    }
                }
            })
            .addCase(uploadProductImage.fulfilled, (state, action) => {
                state.editor.product = action.payload
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
      .addCase(fetchEditorProduct.pending, (state, action) => {
        state.editor = { id: action.meta.arg, product: null, loading: true, error: null }
      })
      .addCase(fetchEditorProduct.fulfilled, (state, action) => {
        state.editor.loading = false
        state.editor.product = action.payload
      })
      .addCase(fetchEditorProduct.rejected, (state, action) => {
        state.editor.loading = false
        state.editor.error = action.error.message
      })
    }
})

export default sellerSlice.reducer
