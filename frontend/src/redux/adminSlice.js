import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL, authConfig } from './apiconfig'
import { logout } from './authSlice'

// busca un usuario exacto por email
export const fetchUserByEmail = createAsyncThunk('admin/fetchUserByEmail', async ({ token, email }) => {
  const { data } = await axios.get(`${URL}/users/email/${encodeURIComponent(email)}`, authConfig(token))
  return data
})

// role = 'USER' | 'VENDOR' | 'ADMIN'. El back responde sin cuerpo: el rol se toma de action.meta.arg
export const assignRole = createAsyncThunk('admin/assignRole', async ({ token, userId, role }) => {
  await axios.post(`${URL}/users/${userId}/roles/${role}`, null, authConfig(token))
})

export const removeRole = createAsyncThunk('admin/removeRole', async ({ token, userId, role }) => {
  await axios.delete(`${URL}/users/${userId}/roles/${role}`, authConfig(token))
})

const initialState = { user: null, loading: false, error: null, roleError: null }

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, () => initialState)

      // búsqueda
      .addCase(fetchUserByEmail.pending, (state) => {
        state.user = null
        state.loading = true
        state.error = null
        state.roleError = null
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      // roles: se actualiza el usuario guardado, porque el back no lo devuelve
      .addCase(assignRole.pending, (state) => {
        state.roleError = null
      })
      .addCase(assignRole.fulfilled, (state, action) => {
        if (state.user && state.user.id === action.meta.arg.userId) {
          state.user.roles = [...state.user.roles, action.meta.arg.role]
        }
      })
      .addCase(assignRole.rejected, (state, action) => {
        state.roleError = action.error.message
      })
      .addCase(removeRole.pending, (state) => {
        state.roleError = null
      })
      .addCase(removeRole.fulfilled, (state, action) => {
        if (state.user && state.user.id === action.meta.arg.userId) {
          state.user.roles = state.user.roles.filter((item) => item !== action.meta.arg.role)
        }
      })
      .addCase(removeRole.rejected, (state, action) => {
        state.roleError = action.error.message
      })
  },
})

export default adminSlice.reducer
