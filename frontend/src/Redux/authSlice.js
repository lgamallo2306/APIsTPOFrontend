import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth'; // Ajustá según tus rutas de backend

// Helper para obtener la configuración con el Token Bearer en los headers
const getAuthConfig = (getState) => {
  const token = getState().auth.token || localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

// 1. login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/authenticate`, credentials);
      // El localStorage.setItem va dentro del thunk (efecto secundario controlado)
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data; // Se espera que devuelva { token, ... }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }
);

// 2. register
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/register`, userData);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al registrarse');
    }
  }
);

// 3. getMe
export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/me`, getAuthConfig(getState));
      return data; // Datos del usuario actual
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener el perfil');
    }
  }
);

// 4. updateMe
export const updateMe = createAsyncThunk(
  'auth/updateMe',
  async (updateData, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/me`, updateData, getAuthConfig(getState));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar el perfil');
    }
  }
);

// 5. changeEmail
export const changeEmail = createAsyncThunk(
  'auth/changeEmail',
  async (emailData, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${API_URL}/email`, emailData, getAuthConfig(getState));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cambiar el email');
    }
  }
);

// 6. changePassword
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`${API_URL}/password`, passwordData, getAuthConfig(getState));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cambiar la contraseña');
    }
  }
);

// 7. deactivateMe
export const deactivateMe = createAsyncThunk(
  'auth/deactivateMe',
  async (_, { getState, rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/me`, getAuthConfig(getState));
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al desactivar la cuenta');
    }
  }
);

const initialState = {
  user: null, // El usuario ya no se guarda en localStorage, se obtiene con getMe
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Reducer puro: el localStorage.removeItem se realiza en el componente antes de disparar esta acción
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Corregido el error de state.loading = error
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GetMe
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // UpdateMe
      .addCase(updateMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // ChangeEmail
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // DeactivateMe
      .addCase(deactivateMe.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

