// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'http://localhost:8080';

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/authenticate`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = response.data;
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      return data;
    }
      return false;
  } catch (error) {
    return false;
  }
});

export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = response.data;
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      return data;
    }
    return false;
  } catch (error) {
    return false;
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  return;
});

const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : {};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('token') !== null,
    role: localStorage.getItem('role') || '',
    loading: false,
    error: null,
    user: initialUser
  },
  reducers: {
    setAuthState: (state, action) => {
      const {role,isAuth} = action.payload;
      state.isAuthenticated = isAuth;
      state.role = role;
    },
    setUser :  (state,action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.role = '';
      });
  },
});


export const { setAuthState ,setUser} = authSlice.actions;
export default authSlice.reducer;
