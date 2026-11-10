import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error:null,

};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginStart:(state) =>{
            state.loading = true,
            state.error = null
        },
        loginSuccess:(state,action) => {
            state.loading = false,
            state.isAuthenticated = true,
            state.user = action.payload.user,
            state.token = action.payload.token,
            localStorage.setItem('token', action.payload.token),
            localStorage.setItem('user',JSON.stringify(action.payload.user))

        },
        loginFailure:(state, action) =>{
            state.loading = error,
            state.error = action.payload
        },
        logout:(state) =>{
            state.user = null,
            state.token = null,
            state.isAuthenticated = null,
            localStorage.removeItem('token'),
            localStorage.removeItem('user')
        },
    },
})

export const {loginFailure, loginStart, loginSuccess,logout} = authSlice.actions
export default authSlice.reducer