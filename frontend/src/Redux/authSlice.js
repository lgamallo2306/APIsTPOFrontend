import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; 


const URL = 'http://localhost:8080/api/v1/auth';


const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});


export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const { data } = await axios.post(`${URL}/authenticate`, credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }
);


export const register = createAsyncThunk(
  'auth/register',
  async (userData) => {
    const { data } = await axios.post(`${URL}/register`, userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }
);


export const getMe = createAsyncThunk(
  'auth/getMe',
  async ({ token }) => {
    const { data } = await axios.get(`${URL}/me`, authConfig(token));
    return data;
  }
);


export const updateMe = createAsyncThunk(
  'auth/updateMe',
  async ({ token, updateData }) => {
    const { data } = await axios.put(`${URL}/me`, updateData, authConfig(token));
    return data;
  }
);


export const changeEmail = createAsyncThunk(
  'auth/changeEmail',
  async ({ token, emailData }) => {
    const { data } = await axios.patch(`${URL}/email`, emailData, authConfig(token));
    return data;
  }
);


export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ token, passwordData }) => {
    const { data } = await axios.patch(`${URL}/password`, passwordData, authConfig(token));
    return data;
  }
);


export const deactivateMe = createAsyncThunk(
  'auth/deactivateMe',
  async ({ token }) => {
    await axios.delete(`${URL}/me`, authConfig(token));
    return true;
  }
);

const initialState = {
  user: null,
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
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Patrón genérico para manejar pending, fulfilled y rejected con action.error.message
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
        state.error = action.error.message; // Usando el mensaje del interceptor/clase
      })

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
        state.error = action.error.message;
      })

      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(updateMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(changeEmail.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(deactivateMe.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

