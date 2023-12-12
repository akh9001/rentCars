import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const HOST_URL = 'http://localhost:3001/customers/login';


export const loginCustomer = createAsyncThunk(
	'customers/login',
	async (userCrendentials) => {
		const response = await axios.post(HOST_URL, userCrendentials);
		const data = await response.data;
		// console.log("response data",response.data);
		localStorage.setItem('token', data.access_token);
		localStorage.setItem('refresh_token', data.refresh_token);
		return data;
	},
);

const authCustomerSlice = createSlice({
	name: 'authCustomer',
	initialState: {
		loading: false,
		isAuthenticated: false,
		token: null,
		user: null,
		error: null
	},
	reducers: {
		logout: (state) => {
			localStorage.removeItem('token');
			localStorage.removeItem('refresh_token');
			state.token = null;
			state.isAuthenticated = false;
			state.user = null;
			state.loading = false;
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginCustomer.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload.access_token;
				state.user = jwtDecode(state.token);
				state.isAuthenticated = true;
			})
			.addCase(loginCustomer.pending, (state, action) => {
				state.loading = true;
				state.isAuthenticated = false;
			})
			.addCase(loginCustomer.rejected, (state, action) => {
				state.loading = false;
				state.isAuthenticated = false;
				if (action.error.message === "Request failed with status code 401")
					state.error = "Invalid credentials";
				else
					state.error = action.error.message;
			})
	}
});

export default authCustomerSlice.reducer;