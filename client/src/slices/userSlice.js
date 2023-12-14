import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../axios/axiosConfig';



export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
	try {
		const response = await api.post('/login', credentials);
		return response.data;
	} catch (error) {
		throw error;
	}
});

// Define the base URL
// const baseURL = 'http://localhost:3000';

// Async thunk for loading user
export const loadUser = createAsyncThunk(
  'user/loadUser',
	async (userId, { rejectWithValue }) => {
    try {
		const { data } = await api.get(`/users/${userId}`, { withCredentials: true });
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Other async thunks (loadSeller, updateUserInformation, etc.) can be defined in a similar manner

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  addressloading: false,
  usersLoading: false,
  error: null,
  successMessage: null
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer to clear errors
    clearErrors: (state) => {
      state.error = null;
    },
    // Reducer to clear success messages
    clearMessages: (state) => {
      state.successMessage = null;
    }
    // Additional reducers can be added here
  },
  extraReducers: (builder) => {
    builder
      // Handling loadUser
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
    // Handle other async thunks similarly
  }
});

// Export actions and reducer
export const { clearErrors, clearMessages } = userSlice.actions;
export default userSlice.reducer;
