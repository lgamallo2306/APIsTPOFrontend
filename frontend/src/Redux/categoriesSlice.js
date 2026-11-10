import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'


export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const { data } = await axios.get(`${URL}/categories`)
    return data.content
})

export const fetchCategoriesPage = createAsyncThunk('categories/fetchCategoriesPage', async (page) => {
    const {data} = await axios.get(`${URL}/categories?page=${page}&size=10`)
    return data
})

export const createCategory = createAsyncThunk('categories/createCategory', async ({token, category}) => {
    const {data} = await axios.post(`${URL}/categories`, category, authConfig(token))
    return data
})

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ token, id, category }) => {
  const { data } = await axios.put(`${URL}/categories/${id}`, category, authConfig(token))
  return data
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async ({ token, id }) => {
  await axios.delete(`${URL}/categories/${id}`, authConfig(token))
})

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        loading: false,
        error: null,
        page: {number: null, data: null, loading: false, error: null},
        
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(fetchCategoriesPage.pending, (state, action) => {
                state.page = {number: action.meta.arg, data: null, loading: true, error: null}
            })
            .addCase(fetchCategoriesPage.fulfilled, (state, action) => {
                state.page.loading = false
                state.page.data = action.payload
            })
            .addCase(fetchCategoriesPage.rejected, (state, action) => {
                state.page.loading = false
                state.page.error = action.error.message
            })

            .addCase(createCategory.fulfilled, (state, action) => {
                state.items = [...state.items, action.payload]
                if(state.page.data){
                    state.page.data.content = [...state.page.data.content, action.payload]
                }
            })

            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id)
                    if (index !== -1) {
                        state.items[index] = action.payload
                    }
                    if (state.page.data) {
                    const pageIndex = state.page.data.content.findIndex((item) => item.id === action.payload.id)
                    if (pageIndex !== -1) {
                        state.page.data.content[pageIndex] = action.payload
                    }
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const id = action.meta.arg.id
                state.items = state.items.filter((item) => item.id !== id)
                if (state.page.data) {
                    state.page.data.content = state.page.data.content.filter((item) => item.id !== id)
                }
            })
                    
       }
})

export default categoriesSlice.reducer