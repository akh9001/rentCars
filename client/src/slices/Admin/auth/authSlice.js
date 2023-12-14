import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
// import "core-js/stable/atob";


//root url
// path: client/src/slices/authSlice.js
const HOST_URL = 'http://localhost:3001/users/login';

export const loginUser = createAsyncThunk(
	'users/login',
	async (userCrendentials) => {
		const response = await axios.post(HOST_URL, userCrendentials);
		const data = await response.data;
		// console.log("response data",response.data);
		localStorage.setItem('token', data.access_token);
		localStorage.setItem('refresh_token', data.refresh_token);
		return data;
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		loading: false,
		token: null,
		user: null,
		error:null
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
		.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;
			state.token = action.payload.access_token;
			state.user = jwtDecode(state.token);;
		})
		.addCase(loginUser.pending, (state, action) => {
			state.loading = true;
		})
		.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
			if (action.error.message === "Request failed with status code 401")
				state.error = "Invalid credentials";
			else
				state.error = action.error.message;
		})
	}
});

export default authSlice.reducer;