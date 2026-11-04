import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products: [],
    selectedProduct: null,
    loading : false,
    error: null
};

export const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setProductsLoading:(state) =>{
            state.loading = true,
            state.error = null
        },
        setProductsSucces:(state, action) =>{
            state.loading = false,
            state.products = action.payload
        },
        setProductsFailure:(state, action) =>{
            state.loading = false,
            state.error = action.payload

        },
        setSelectedProduct:(state,action) =>{
            state.selectedProduct = action.payload
        },
    },
})

export const{setProductsLoading, setProductsSucces, setProductsFailure } = productSlice.actions

export default productSlice.reducer