import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'

// credentials = { email, password }. El back devuelve { access_token }
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const { data } = await axios.post(`${URL}/api/v1/auth/authenticate`, credentials)
  localStorage.setItem('token', data.access_token)
  return data.access_token
})

// userData = { firstname, lastname, email, password, role }
export const register = createAsyncThunk('auth/register', async (userData) => {
  const { data } = await axios.post(`${URL}/api/v1/auth/register`, userData)
  localStorage.setItem('token', data.access_token)
  return data.access_token
})

// trae el usuario del token (con sus roles)
export const getMe = createAsyncThunk('auth/getMe', async (token) => {
  const { data } = await axios.get(`${URL}/users/me`, authConfig(token))
  return data
})

// updateData = { name, surname }. Devuelve el usuario actualizado
export const updateMe = createAsyncThunk('auth/updateMe', async ({ token, updateData }) => {
  const { data } = await axios.patch(`${URL}/users/me`, updateData, authConfig(token))
  return data
})

// emailData = { newEmail, currentPassword }. Devuelve un token nuevo (el token lleva el email)
export const changeEmail = createAsyncThunk('auth/changeEmail', async ({ token, emailData }) => {
  const { data } = await axios.patch(`${URL}/users/me/email`, emailData, authConfig(token))
  localStorage.setItem('token', data.access_token)
  return data.access_token
})

// passwordData = { currentPassword, newPassword }
export const changePassword = createAsyncThunk('auth/changePassword', async ({ token, passwordData }) => {
  await axios.patch(`${URL}/users/me/password`, passwordData, authConfig(token))
})

// passwordData = { password }. En un DELETE de axios el body va dentro de la config, en data
export const deactivateMe = createAsyncThunk('auth/deactivateMe', async ({ token, passwordData }) => {
  await axios.delete(`${URL}/users/me`, { headers: authConfig(token).headers, data: passwordData })
  localStorage.removeItem('token')
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: null,
    // arranca en true si hay token guardado: todavía falta traer el usuario
    loadingUser: localStorage.getItem('token') !== null,
    loading: false,
    error: null,
  },
  reducers: {
    // el localStorage.removeItem('token') lo hace el componente antes de despachar
    logout: (state) => {
      state.token = null
      state.user = null
      state.loadingUser = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        state.loadingUser = true
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload
        state.loadingUser = true
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.loadingUser = false
      })
      // el token guardado venció o no sirve: se cierra la sesión
      .addCase(getMe.rejected, (state) => {
        state.token = null
        state.user = null
        state.loadingUser = false
      })

      .addCase(updateMe.fulfilled, (state, action) => {
        state.user = action.payload
      })
      // token nuevo: App vuelve a pedir el usuario con el email actualizado
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.token = action.payload
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
