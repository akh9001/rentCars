import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const HOST_URL = 'http://localhost:3001/customers/register';


export const register = createAsyncThunk(
	'customers/register',
	async (userCrendentials) => {
		const response = await axios.post(HOST_URL, userCrendentials);
		const data = await response.data;
		return data;
	},
);

const registerSlice = createSlice({
	name: 'register',
	initialState: {
		loading: false,
		error: null
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(register.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				// if (action.error.message === "Request failed with status code 401")
				// 	state.error = "Invalid credentials";
				// else
				state.error = action.error.message;
			})
	}
});

export default registerSlice.reducer;